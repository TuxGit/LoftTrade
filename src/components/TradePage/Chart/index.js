import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {LineChart} from 'react-easy-chart';
import moment from 'moment';

import { selectOffset, getOffsetCurency, getCurrentCurrencyData } from '../../../ducks/currency';
import {ButtonList, Button, ActiveButton} from './styles';

const offsets = {
  '2h': '2ч',
  '4h': '4ч',
  '8h': '8ч',
  '1d': '1д',
  '7d': '7д'
};

class Chart extends PureComponent {
  onSelectOffset = (e) => {
    const offset = e.target.dataset.id;
    this.props.selectOffset(offset);
  }

  render () {
    const { data, offset } = this.props;

    if (!data) return null;

    return (
      <article>
        <h2>Окно графика</h2>
        <div>
          <ButtonList>
            {Object.keys(offsets).map(key =>
              offset === key
                ? <ActiveButton key={key} data-id={key} onClick={this.onSelectOffset}>{offsets[key]}</ActiveButton>
                : <Button key={key} data-id={key} onClick={this.onSelectOffset}>{offsets[key]}</Button>
            )}
          </ButtonList>
          <div className="line-chart">
            <LineChart
              lineColors={['blue', 'red']}
              axes
              grid
              verticalGrid
              interpolate={'cardinal'}
              xType={'time'}
              datePattern={'%d-%m %H:%M'}
              width={750}
              height={400}
              style={{
                '.axis path': {
                  stroke: '#EDF0F1'
                }
              }}
              data={[
                data.map(item => ({x: moment(item.mts).format('DD-MM HH:mm'), y: item.sell})),
                data.map(item => ({x: moment(item.mts).format('DD-MM HH:mm'), y: item.purchase}))
              ]}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default connect(
  state => ({
    offset: getOffsetCurency(state),
    data: getCurrentCurrencyData(state)
  }),
  { selectOffset }
)(Chart);
