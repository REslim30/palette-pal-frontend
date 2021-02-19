import { hexToRgb, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

// Wrapper around material-ui icon-button that is closer to right-edge
export default styled(IconButton)({
  marginRight: '-12px',
  color: "white"
});