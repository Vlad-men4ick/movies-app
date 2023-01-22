import { Alert } from 'antd';
import './EmptyRequest.css';

function EmptyRequest() {
  return <Alert message="Nothing found on your request" type="info" />;
}
export default EmptyRequest;
