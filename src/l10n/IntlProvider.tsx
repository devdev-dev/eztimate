import * as React from 'react';
import { createIntl, IntlProvider as ReactIntlProvider } from 'react-intl';
import translationsDe from './messages_de.json';
import translationsEn from './messages_en.json';

export const DEFAULT_LOCALE = 'en-US';

export const IntlProvider: React.FunctionComponent<{}> = ({ children }) => {
  const resolvedLocale = resolveLocale();
  return (
    // Setting the components key is used to prevent stale translations on locale change: https://github.com/yahoo/react-intl/issues/234
    <ReactIntlProvider key={resolvedLocale} locale={resolvedLocale} messages={resolveMessages(resolvedLocale)}>
      {children}
    </ReactIntlProvider>
  );
};

const resolveLocale = () => {
  let locale = '';
  if (typeof window !== 'undefined') {
    locale = navigator.language;
  }
  return locale.startsWith('de') || locale.startsWith('en') ? locale : DEFAULT_LOCALE;
};

export const getIntl = () => {
  const resolvedLocale = resolveLocale();
  return createIntl({ locale: resolvedLocale, messages: resolveMessages(resolvedLocale) });
};

export const resolveMessages = (locale: string) => {
  if (locale.startsWith('de')) {
    return { ...translationsEn, ...translationsDe };
  } else {
    return translationsEn;
  }
};
