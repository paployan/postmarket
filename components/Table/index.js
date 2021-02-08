import { array } from 'prop-types';
import { Table } from 'react-bootstrap';

const AppTable = ({ headers, children }) => {
  return (
    <Table responsive className="custom-table">
        <thead>
            <tr>
                {headers.map((column, index) => (
                    <th key={index.toString()}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </Table>
  );
};

AppTable.propTypes = {
  headers: array,
};
  
export default AppTable;
