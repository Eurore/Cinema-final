const About = {
  name: "about",
  template: `
        <div class='about' data-aos="fade">
          <h1> За Cinema Land Varna </h1>
          <img
            src='https://entrepreneurship.babson.edu/wp-content/uploads/2020/10/Movie-1200-630.jpg'
            width="1900"
            height="1080"
            alt='Cinema Land Varna'
          />
          <p>
              Сайтът на Cinema Land Varna ви информира подробно за премиерни и предстоящи филми, за събития в киното и дава възможност за лесно и бързо закупуване или резервация на билети.
              Можете да следите актуалните ни предложения и промоции, както и да участвате в тях.
              Отдайте се на магията на киното - ние ви гарантираме изживяване от ново измерение.
          </p>
          <p>С уважение: екипът на Cinema Land Varna</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.150223709799!2d27.912144815019822!3d43.2063383892297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453f57d0214d1%3A0x5fc4a0c0429ca9de!2zYnVsLiAiS255YWdpbnlhIE1hcmlhIEx1aXphIiAzNywgOTAwMCDQktCw0YDQvdCwINCm0LXQvdGC0YrRgCwg0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1651343173511!5m2!1sbg!2sbg" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <br>
        <hr/>
        <br>
        <p> За въпроси и допълнителна информация, свържете се с нас чрез:</p>
        <br>
        <ul>
          <li> Имейл: ertan@craftbery.co</li>
          <li> Телефонен номер: 087 650 6617</li>
          <li> Инстаграм: <a href="https://www.instagram.com/aurlaxy/" target="_blank">https://www.instagram.com/aurlaxy</a></li>
        </ul>
  `,
  setup() {

    Vue.onMounted(() => {
      AOS.init({
        once: true,
        offset: 0,
      })
    })

    return {
      cinema,
    };
  },
};
