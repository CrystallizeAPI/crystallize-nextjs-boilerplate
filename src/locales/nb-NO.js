export default {
  translation: {
    common: {
      price: '{{value, currency}}',
      vat: 'Moms: {{value, currency}}'
    },
    frontpage: {
      title: 'Hjem'
    },
    customer: {
      name: 'Navn',
      firstName: 'Fornavn',
      lastName: 'Etternavnn',
      streetAddress: 'Gate',
      postalCode: 'Postnr.',
      email: 'Epost',
      emailPlaceholder: 'deg@ditt.sted',
      login: {
        title: 'Logg inn',
        loggedIn: 'Du er logget inn',
        instructions:
          'Tast inn din epostaddresse og vi vil sende deg en passordfri innlogginslink',
        emailAddressInvalid: 'Vennligst oppgi en gyldig epostaddresse',
        sendMagicLink: 'Send meg innloggingslink på epost'
      }
    },
    product: {
      relatedProduct: 'Relatert produkt',
      relatedProduct_plural: 'Relaterte produkter',
      addToBasket: 'Legg i handlekurv',
      buy: 'KJØP',
      attributes: {
        color: 'Color',
        green: 'Green',
        blue: 'Blue',
        black: 'Black'
      }
    },
    basket: {
      title: 'Handlekurv',
      loading: 'Vennligst vent. Henter din handlekurv...',
      removeItem: 'Fjern {{name}} fra handlekurven',
      empty: 'Handlekurven din er tom',
      empty_inCheckout: 'Du har ikke lagt til noe i handlekurven enda.',
      remainingUntilFreeShipping:
        'Kjøp for {{amount, currency}} ekstra for å oppnå gratis frakt',
      totalPrice: 'Totalt',
      discount: 'Fratrekk',
      totalPriceAfterDiscount: 'Totalt etter fratrekk',
      shippingPrice: 'Frakt',
      vat: 'Moms',
      totalToPay: 'Til betaling',
      goToCheckout: 'Gå til betaling'
    },
    checkout: {
      title: 'Betaling',
      payNow: 'Betal nå',
      choosePaymentMethod: 'Velg betalingsmetode',
      noPaymentProvidersConfigured: 'Ingen betalingstjenester er konfigurert',
      paymentProviderNotConfigured:
        'Betalingstjenesten {{name}} er ikke konfigurert',
      paymentProviderLogoAlt: 'Logo for {{name}}',
      confirmingCardPayment: 'Please wait your card details are confirmed...',
      loadingPaymentGateway: 'Laster betalingstjenesten...',
      loadingPaymentGatewayFailed:
        'Oisann. Betalingstjenesten {{name}} kan ikke lastes akkurat nå',
      confirmation: {
        title: 'Ordrebekreftelse',
        shortStatus: `Din ordre er bekreftet`,
        shortStatus_withEmail: `Din ordre er bekreftet. En kopi av ordren er send til {{email}}`
      }
    },
    order: {
      total: 'Totalt',
      item: 'Vare',
      item_plural: 'Varer'
    },
    layout: {
      menu: 'Meny',
      ecomBy: 'Nettbutikk av',
      loadingVideo: 'Laster video'
    }
  }
};
