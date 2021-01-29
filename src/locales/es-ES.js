export default {
  translation: {
    common: {
      price: '{{value, currency}}',
      tax: 'VAT: {{value, currency}}',
      close: 'Cerrar'
    },
    frontpage: {
      title: 'Inicio'
    },
    customer: {
      name: 'Nombre',
      firstName: 'Nombre',
      lastName: 'Apellido',
      streetAddress: 'Dirección',
      postalCode: 'Codigo postal',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@tu.direcction',
      login: {
        title: 'Inicio sesión',
        loggedIn: 'Tienes una sesión activa',
        instructions:
          'Introduce una dirección de correo electrónico y te enviaremos un enlace mágico para inciar sesión a tu correo.',
        emailAddressInvalid:
          'Por favor introduce una dirección de correo electrónico válida',
        sendMagicLink: 'Envíame el enlace mágico'
      }
    },
    product: {
      relatedProduct: 'También podrías estar interesado en',
      relatedProduct_plural: 'También podríais estar interesados en',
      addToBasket: 'Añadir a la cesta',
      buy: 'COMPRA',
      stock: '{{stockCount}} en reserva',
      outOfStock: 'Sin reserva',
      attributes: {
        color: 'Color',
        green: 'Verde',
        blue: 'Azul',
        black: 'Negro'
      }
    },
    basket: {
      title: 'Cesta',
      loading: 'Espera. Estamos actualizando tu cesta...',
      removeItem: 'eliminar {{name}} de tu cesta',
      empty: 'Tu cesta está vacía',
      empty_inCheckout: 'No tienes objetos en tu cesta',
      remainingUntilFreeShipping:
        'Añade otra {{amount, currency}} a tu pedido para tener envío gratuito.',
      totalPrice: 'Precio total',
      discount: 'Descuento',
      totalPriceAfterDiscount: 'Total con descuento realizado',
      shippingPrice: 'Envio',
      vat: 'VAT',
      totalToPay: 'A pagar',
      goToCheckout: 'Ir a pagar'
    },
    checkout: {
      title: 'Comprar',
      payNow: 'Pagar ahora',
      choosePaymentMethod: 'Elegir método de pago',
      noPaymentProvidersConfigured: 'No hay proveedores de pago configurados',
      paymentProviderNotConfigured:
        'El proveedor de pagos {{name}} no está configurado',
      paymentProviderLogoAlt: 'Logo de {{name}}',
      confirmingCardPayment:
        'Porfavor espera a que los datos de la tarjeta se validen...',
      loadingPaymentGateway: 'Inicializando pasarela de pago...',
      loadingPaymentGatewayFailed:
        'Oh no. No pudimos cargar la pasarela de pago de {{name}}',
      confirmation: {
        title: 'Confirmación de pedido',
        shortStatus: `Tu pedido se ha confirmado.`,
        shortStatus_withEmail: `Tu pedido se ha confirmado. Se ha enviado una copia a {{email}}`
      }
    },
    order: {
      total: 'Total',
      item: 'Ordenar objeto',
      item_plural: 'Ordenar objetos'
    },
    layout: {
      menu: 'Menú',
      searchPlaceholder: 'Busca cosas',
      ecomBy: 'eCommerce por',
      loadingVideo: 'Cargando video',
      slider: {
        previous: 'Ver el elemento siguiente',
        next: 'Ver el elemento anterior'
      }
    },
    search: {
      label: 'Buscar',
      foundResults: 'Hemos encontrado {{count}} resultado de búsqueda',
      foundResults_plural: 'Hemos encontrado {{count}} resultados de búsqueda',
      orderTitle: 'Ordenar por',
      order: {
        ITEM_NAME_ASC: 'Nombre ascendente',
        ITEM_NAME_DESC: 'Nombre descendente',
        PRICE_ASC: 'Precio ascendente',
        PRICE_DESC: 'Precio descendente',
        STOCK_ASC: 'Objetos reserva ascendente',
        STOCK_DESC: 'Objetos reserva descendente'
      },
      filter: 'Filtrar',
      facets: {
        viewNResults: 'Mostrar {{count}} resultado',
        viewNResults_plural: 'Mostrar {{count}} resultados',
        reset: 'Reiniciar',
        price: {
          title: 'Precio',
          min: 'Precio mínimo',
          max: 'Precio máximo'
        }
      }
    },
    vouchers: {
      title: 'Vale'
    }
  }
};
