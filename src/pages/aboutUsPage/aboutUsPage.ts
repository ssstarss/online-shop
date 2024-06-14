import { githubSvg, rssLogoSvg } from '../../assets/icons';
import { angelina, angelinaCat, phalm, sveta, svetaCat } from '../../assets/images';
import createElement from '../../helpers/createElement';

interface User {
  name: string;
  description: string;
  image: string;
  imageCat: string;
  githubLink: string;
}

const users: User[] = [
  {
    name: 'Angelina',
    description: `&nbsp&nbspMy name is Angelina, I am 27 years old. I was born and lived most of my life in Saint Petersburg, but for the past two years, I have been living in Yerevan, Armenia.\n
    &nbsp&nbspI have a very cute and funny cat, Geralt, who was named after the Witcher. However, the cat didn't inherit the bravery and wit of Geralt of Rivia, but that doesn't stop me from loving him with all my heart.\n
    &nbsp&nbspI got a degree in English Philology, and for a long time, I worked as a tutor for adults and children. I started my journey in IT a long time ago, even before COVID-19, when I first took a course in manual testing. However, after the training, I wanted to change my focus within IT to find the perfect combination of creativity and development, which I found in front-end development.\n
    &nbsp&nbspAfter a year of studying through courses and on my own, I still lacked the confidence to apply for a front-end developer position, so I began applying for positions as an HTML-developer. This is how I got a job at MCArt, where we developed internal portals for large companies based on Bitrix. However, after a year of work, I realized that my tasks were far from full-fledged front-end development, so I quit with the desire to continue my education and finally become a true front-end developer. That’s how I ended up in RSSchool!\n
    &nbsp  On my current project, I worked on the implementation of the login page, cart, catalog, and product detail page from the front-end side.`,
    image: angelina,
    imageCat: angelinaCat,
    githubLink: 'https://github.com/gerlinda137',
  },
  {
    name: 'Svetlana',
    description: `&nbsp&nbspMy name is Svetlana, I am 30 years old. I was born and have lived my entire life in Zhlobin, Belarus.\n&nbsp&nbspI have a very cute cat named Buusinka, who always stays close to me when I'm studying for my courses. I started getting interested in web development back in school, but I chose to pursue an artistic path in my higher education. Years later, I returned to my dream of becoming a developer and completed courses at TeachMeSkills, where we studied HTML, CSS, JavaScript, and React.js. I successfully completed the courses and defended my final project.\n&nbsp&nbspAfterwards, I found a job, but unfortunately, the project I was working on got frozen, and I didn't stay there long. However, I enjoyed the experience and started applying for positions at other companies. Although I lacked some skills and knowledge, I decided to enroll in the RSSchool course on the recommendation of friends. I completed the zero stage, and I am currently on stage 2, which I'm attempting for the third time. Various factors prevented me from finishing it the first two times, but now I'm here, working on the final project with a great team.\n&nbsp&nbspOn our current project, I've been mostly responsible for setting up the environment, routing, navigation, styling the header, footer, and menu, as well as handling redirects and working on the profile and about us pages.\n`,
    image: sveta,
    imageCat: svetaCat,
    githubLink: 'https://github.com/sviatlana-vilchynskaya',
  },
];

function createUserItem({ image, imageCat, description, githubLink }: User): HTMLElement {
  const aboutUsItemContainer = createElement({ tag: 'div', className: 'about-us__item-container' });
  const aboutUsItem = createElement({ tag: 'div', className: 'about-us__item' });
  const itemImg = createElement({ tag: 'img', className: 'item__img image', src: image });
  const itemImg2 = createElement({ tag: 'img', className: 'item__img image2', src: imageCat });

  const descriptionElem = createElement({
    tag: 'p',
    className: 'item__description',
  });
  const formattedDescription = description.replace(/\n/g, '<br>');
  descriptionElem.innerHTML = formattedDescription;
  const gitHubLinkElem = createElement({
    tag: 'a',
    className: 'item__link',
    href: githubLink,
    target: '_blank',
  });
  gitHubLinkElem.innerHTML = githubSvg;

  aboutUsItemContainer.append(itemImg, itemImg2, descriptionElem, gitHubLinkElem);
  aboutUsItem.append(aboutUsItemContainer);

  return aboutUsItem;
}

const aboutUsPage = createElement({
  tag: 'section',
  className: 'about-us',
});
aboutUsPage.style.backgroundImage = `url(${phalm})`;

const aboutUsPageContainer = createElement({
  tag: 'div',
  className: 'about-us__container container',
});
const aboutUsPageTitle = createElement({
  tag: 'h2',
  className: 'about-us__title',
  textContent: 'About Us',
});

const aboutUsPageRSSlogo = createElement({
  tag: 'a',
  className: 'about-us__rss-logo',
  href: 'https://rs.school/',
  target: '_blank',
});
aboutUsPageRSSlogo.innerHTML = rssLogoSvg;
aboutUsPageContainer.append(aboutUsPageRSSlogo, aboutUsPageTitle);

users.forEach((user) => {
  const userItem = createUserItem(user);
  aboutUsPageContainer.append(userItem);
});

aboutUsPage.append(aboutUsPageContainer);

export default aboutUsPage;
