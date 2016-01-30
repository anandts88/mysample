import Ember from 'ember';
import EmberValidator from 'ember-validator';
import { animateTo } from 'mdr/utility/utils';

const {
  Component
} = Ember;

export default Component.extend(EmberValidator, {
  tagName: 'section',
  classNames: ['appointment-time'],
  showConfirm: false,

  durations: [
    {
      value: 30,
      display: '30 min'
    },
    {
      value: 60,
      display: '1 hour'
    },
    {
      value: 90,
      display: '1 hour 30 mins'
    },
    {
      value: 120,
      display: '2 hours'
    }
  ],

  validations(model) {
    return {
      start_date: {
        required: 'Start date is required'
      },
      duration: {
        required: 'Duration is required'
      },
      selected_speciality: {
        if: function() {
          return model.get('selected_appointment_with') === 'Doctor';
        },
        required: 'Speciality is required.'
      },
      reason: {
        required: 'Reason is required',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        }
      },
      alt_info: {
        length: {
          maximum: 500,
          message: 'Must be 500 characters or less.'
        }
      }
    };
  },

  dateValidation() {
    return {
      start_date: {
        date: {
          format: 'MMM DD YYYY',
          afterSame: {
            target: new Date()
          },
          message: 'Start date must be after current date.'
        }
      }
    };
  },

  actions: {
    next() {
      const self        = this;
      const nextAction  = this.attrs.nextAction;
      const model       = this.get('model');
      let validations   = this.validations(model);

      model.set('validationResult', null);

      if (this.get('showConfirm')) {
        this.set('showConfirm', false);
        if (nextAction) {
          nextAction();
        }

        return;
      }

      self.validateMap({ model, validations }).then(() => {
        validations = self.dateValidation();
        self.validateMap({ model, validations }).then(() => {
          if (model.get('selected_appointment_with') === 'Doctor' && !model.get('files')) {
            self.set('showConfirm', true);
            animateTo({ element: this.$('.appointment-time-confirm') });
          } else {
            if (nextAction) {
              nextAction();
            }
          }
        }).catch((validationResult) => {
          model.set('validationResult', validationResult);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    },

    cancel() {
      this.set('showConfirm', false);
    },

    onAttenderChange() {
      const model       = this.get('model');
      model.set('selected_speciality', null);
    },

    confirmAction() {
      const nextAction  = this.attrs.nextAction;
      if (nextAction) {
        nextAction();
      }
    }
  }
});
