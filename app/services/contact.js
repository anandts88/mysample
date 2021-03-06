import Ember from 'ember';

const {
  Service,
  inject
} = Ember;

const {
  service
} = inject;

export default Service.extend({
  doctors: service(),
  assessors: service(),
  staffs: service(),
  admins: service(),
  clients: service(),

  createDoctor(response) {
    let data;
    if (response) {
      data = _.assignIn(response.doctorInfo, response.doctorContact);
    }
    return this.get('doctors').createDoctor(data);
  },

  createAssessor(response) {
    let data;
    if (response) {
      data = _.assignIn(response.assessorInfo, response.assessorContact);
    }
    return this.get('assessors').createAssessor(data);
  },

  createStaff(response) {
    let data;
    if (response) {
      data = _.assignIn(response.agencyStaffInfo, response.agencyStaffContact);
    }
    return this.get('staffs').createStaff(data);
  },

  createAdmin(response) {
    let data;
    if (response) {
      data = _.assignIn(response.agencyAdminInfo, response.agencyAdminContact);
    }
    return this.get('admins').createAdmin(data);
  },

  createClient(response) {
    let data;
    if (response) {
      data = _.assignIn(response.customerInfo, response.customerContact);
    }
    return this.get('clients').createClient(data);
  }
});
