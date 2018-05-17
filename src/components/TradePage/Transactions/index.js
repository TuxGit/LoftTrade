import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSelectedCurrency } from '../../../ducks/currency';
import { getRecords } from '../../../ducks/transactions';
import { Table, Tr, TrHead, Th, Td } from './styles';

class Transactions extends PureComponent {
  render () {
    let { currency, records } = this.props;

    if (!records) return null;

    records = records.filter(item => item[`${currency}_delta`] !== undefined);

    return (
      <article>
        <Table>
          <thead>
            <TrHead>
              <Th>Операция</Th>
              <Th>Дата</Th>
              <Th>{currency === 'eth' ? 'Eth' : 'Btc'}</Th>
              <Th>USD</Th>
            </TrHead>
          </thead>
          <tbody>
            {records.map((item, index) =>
              <Tr key={index}>
                <Td>{item.usd_delta > 0 ? 'Продажа' : 'Покупка'}</Td>
                <Td>{moment(item.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD.MM.YYYY HH:mm')}</Td>
                <Td>{item[`${currency}_delta`]}</Td>
                <Td>{item.usd_delta}</Td>
              </Tr>
            )}
          </tbody>
        </Table>
      </article>
    );
  }
}

export default connect(
  state => ({
    currency: getSelectedCurrency(state),
    records: getRecords(state)
  }),
  { }
)(Transactions);
