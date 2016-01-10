import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.get('titlebar').set('right_content', 'add-client-appointment-btn');
  },

  deactivate() {
    this.get('titlebar').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
  },

  afterModel(model) {
    this.get('titlebar').set('right_content_model', model);
  }
});
