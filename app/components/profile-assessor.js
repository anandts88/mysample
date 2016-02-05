import Ember from 'ember';
import Assessor from 'mdr/models/assessor';
import Api from 'mdr/mixins/api';

const {
  Component,
  on,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, {
  session: service(),
  assessors: service(),
  notifications: service(),

  edit_personal: false,
  edit_contact: false,
  edit_billing: false,
  approved: false,

  model: null,

  set_model() {
    const assessor = Assessor.create();

    assessor.setProperties(_.pick(this.get('assessor'), [
      'active',
      'last_name',
      'first_name',
      'dob',
      'gender',
      'email_id',
      'phone1',
      'phone2',
      'address1',
      'state1',
      'city1',
      'zip1',
      'rater_id',
      'employee_number',
      'assessor_id',
      'active'
    ]));

    this.set('model', assessor);
  },

  init_props: on('didInitAttrs', function() {
    this.set_model();
  }),

  actions: {
    togglePersonal() {
      this.set_model();
      this.toggleProperty('edit_personal');
    },

    toggleContact() {
      this.toggleProperty('edit_contact');
    },

    approve() {
      const self = this;
      const data = {};
      data.isApproved = true;
      data.assessor_id = self.get('assessor.assessor_id');

      self.ajax({
        id: 'patchprospect',
        data
      }).then(() => {
        self.get('notifications').backgroundNotification();
        self.setProperties({
          'assessor.cache': false,
          'model.active': 1,
          'assessor.active': 1,
          approved: true
        });
      });
    }
  }
});
