import createElement from '../../helpers/createElement';

export const registrationPage = createElement('section', 'registration');
export const btn = createElement('button', 'button', 'link');
btn.textContent = 'LINK';

registrationPage.textContent = 'REGISTRATION PAGE';
registrationPage.append(btn);
