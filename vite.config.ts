import {resolve} from 'path'
export default {
  // base: '/y/',
  build: {
    rollupOptions: {
      input: {
        // @ts-ignore
        main: resolve('index.html'),
        entrance: resolve('entrance.html'),
        items: resolve('items.html'),
        prices: resolve('prices.html'),
        tutors: resolve('tutors.html'),
        confirm_password: resolve('confirm_password.html'),
        confirm_password_2: resolve('confirm_password_2.html'),
        confirm_password_3: resolve('confirm_password_3.html'),
        contacts: resolve('contacts.html'),
        payment: resolve('payment.html'),
        personal_area_student: resolve('personal_area_student.html'),
        personal_area_teacher: resolve('personal_area_teacher.html'),
        registration_student: resolve('registration_student.html'),
        registration_teacher: resolve('registration_teacher.html'),
        setting_up_timetable_student_start: resolve('setting_up_timetable_student_start.html'),
        setting_up_timetable_student: resolve('setting_up_timetable_student.html'),
        setting_up_timetable_teacher: resolve('setting_up_timetable_teacher.html'),
        subscription_selection_start: resolve('subscription_selection_start.html'),
        del: resolve('del.html'),
        del2: resolve('del2.html'),
      }
    }
  }
}