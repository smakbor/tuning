import Avatar from 'components/@extended/Avatar';
import PropTypes from 'prop-types';
const avatarImage = import.meta.glob('./assets/images/users');

const CellAvatar = ({ src = avatarImage, size = 'sm', alt }) => <Avatar alt={alt} size={size} src={src} />;

CellAvatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};

export default CellAvatar;
