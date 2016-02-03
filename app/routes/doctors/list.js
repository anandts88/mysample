import Ember from 'ember';
import Doctors from 'mdr/models/doctors';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend({
  doctors: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-doctor');
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('doctors').getDoctors().then((doctors) => {
        resolve(Doctors.create({
          doctors
        }));
      });
    });
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  }
});
