import {resolve} from 'path'
export default {
  // base: '/y/',
  build: {
    rollupOptions: {
      input: {
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
        check_amount_start: resolve('check_amount_start.html'),
        payment_page_start: resolve('payment_page_start.html'),
        payment_page: resolve('payment_page.html'),
        check_amount: resolve('check_amount.html'),
        free_lesson: resolve('free_lesson.html'),
        payment_end: resolve('payment_end.html'),
        payment_verification: resolve('payment_verification.html'),
        yandex_7b6a1c0c971104d4: resolve('yandex_7b6a1c0c971104d4.html'),
        robots: resolve('robots.txt'),
        // doc_1: resolve('doc_1.pdf'),
        // doc_2: resolve('doc_2.pdf'),
      }
    }
  }
}