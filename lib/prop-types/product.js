import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  link: PropTypes.string,
  price: PropTypes.number,
  product_image: PropTypes.string,
  product_image_resized: PropTypes.string
});
