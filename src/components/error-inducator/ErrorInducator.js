import { Alert } from 'antd';
import './ErrorInducator.css';

function ErrorInducator() {
  return <Alert message="Something went completely wrong" type="error" />;
}
export default ErrorInducator;
