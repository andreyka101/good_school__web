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
        tutors: resolve('repetitory.html'),
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
        free_lesson: resolve('probnyy-urok.html'),
        payment_end: resolve('payment-end.html'),
        payment_verification: resolve('payment-verification.html'),
        yandex_7b6a1c0c971104d4: resolve('yandex_7b6a1c0c971104d4.html'),
        robots: resolve('robots.txt'),
        articles: resolve('articles.html'),
        blog: resolve('blog.html'),

        povysheniye_uspevayemosti_v_shkole: resolve('articles/povysheniye-uspevayemosti-v-shkole.html'),
        detailed_instructions_for_choosing_a_school: resolve('articles/podrobnaya-instrukciya-vybora-shkoly.html'),
        how_to_choose_a_school_for_a_child: resolve('articles/kak-vybrat-shkolu-rebenku.html'),

        howthegreekscalculatedtheearthsradius: resolve("blog/kak-greki-vychislili-radius-zemli.html"),
        pythagoras: resolve('blog/pifagor.html'),
        thalesofmiletus: resolve('blog/fales-miletskiy.html'),
        thefirstscientists: resolve('blog/pervye-uchenye.html'),
        howfarisittothesun: resolve('blog/kak-daleko-do-solnca.html'),
        archimedeslawleverage: resolve('blog/zakon-arhimeda-rychag.html'),
        measurelengthfromcubittometer: resolve('blog/izmerenie-dliny-ot-loktya-do-metra.html'),
        // doc_1: resolve('doc_1.pdf'),
        // doc_2: resolve('doc_2.pdf'),
      }
    }
  }
}