import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  processingText: 'Processing',
  processing: false
});
