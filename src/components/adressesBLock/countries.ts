const countries = [
  { country: 'Poland', ISO: 'PL', regExp: '^\\d{2}-\\d{3}$', tip: '11-111' },
  { country: 'France', ISO: 'FR', regExp: '^\\d{2}[ ]?\\d{3}$', tip: '11 111' },
  { country: 'Russia', ISO: 'RU', regExp: '^\\d{6}$', tip: '111111' },
  { country: 'USA', ISO: 'US', regExp: '^\\d{6}$', tip: '111111' },
  { country: 'Australia', ISO: 'AU', regExp: '^\\d{4}$', tip: '1111' },
  { country: 'Lithuania', ISO: 'LT', regExp: '^[Ll][Tt]-\\d{5}$', tip: 'LT-11111' },
];

export default countries;
