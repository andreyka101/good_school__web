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
        confirm_password: resolve('confirm-password.html'),
        confirm_password_2: resolve('confirm-password-2.html'),
        confirm_password_3: resolve('confirm-password-3.html'),
        contacts: resolve('contacts.html'),
        payment: resolve('payment.html'),
        personal_area_student: resolve('personal-area-student.html'),
        personal_area_teacher: resolve('personal-area-teacher.html'),
        registration_student: resolve('registration-student.html'),
        registration_teacher: resolve('registration-teacher.html'),
        setting_up_timetable_student_start: resolve('setting-up-timetable-student-start.html'),
        setting_up_timetable_student: resolve('setting-up-timetable-student.html'),
        setting_up_timetable_teacher: resolve('setting-up-timetable-teacher.html'),
        subscription_selection_start: resolve('subscription-selection-start.html'),
        check_amount_start: resolve('check-amount-start.html'),
        payment_page_start: resolve('payment-page-start.html'),
        payment_page: resolve('payment-page.html'),
        check_amount: resolve('check-amount.html'),
        free_lesson: resolve('free-lesson.html'),
        payment_end: resolve('payment-end.html'),
        payment_verification: resolve('payment-verification.html'),
        yandex_7b6a1c0c971104d4: resolve('yandex-7b6a1c0c971104d4.html'),
        robots: resolve('robots.txt'),
        articles: resolve('articles.html'),

        povysheniye_uspevayemosti_v_shkole: resolve('articles/povysheniye-uspevayemosti-v-shkole.html'),
        detailed_instructions_for_choosing_a_school: resolve('articles/detailed-instructions-for-choosing-a-school.html'),
        how_to_choose_a_school_for_a_child: resolve('articles/how-to-choose-a-school-for-a-child.html'),

        howthegreekscalculatedtheearthsradius: resolve("blog/how-the-greeks-calculated-the-earth's-radius.html"),
        pythagoras: resolve('blog/pythagoras.html'),
        thalesofmiletus: resolve('blog/thales-of-miletus.html'),
        thefirstscientists: resolve('blog/the-first-scientists.html'),
        // doc_1: resolve('doc_1.pdf'),
        // doc_2: resolve('doc_2.pdf'),
      }
    }
  }
}