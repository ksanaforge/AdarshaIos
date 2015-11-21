'use strict';

import React, { Component, ListView, PropTypes, Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-icons';
import { Spinner } from 'react-native-icons';

import kse from 'ksana-search';
import ksa from 'ksana-simple-api';
import { styles } from './categoryView.style';
import { DB_NAME } from '../constants/AppConstants';

import _ from 'lodash';

class CategoryView extends Component {

  static PropTypes = {
    title: PropTypes.string,
    tocRows: PropTypes.object.isRequired,
    navigator: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }),
    loading: false
  };

  tocRows = [];

  componentDidMount() {
    this.setTocRows(this.props.tocRows);
    this._rows = [];
    this.setState({
      dataSource: this.getDataSource(this.tocRows)
    });
  }

  setTocRows = (tocRows = []) => {
    this.tocRows = tocRows;
  }

  getDataSource = (rows) => {
    this._rows = this._rows.concat(rows);
    return this.state.dataSource.cloneWithRows(this._rows);
  }

  onRowClicked(row) {

    if (_.isEmpty(row.children)) {

      this.setState({
        loading: true
      });

      ksa.fetch({db: DB_NAME, vpos: row.vpos}, (err, data) => {

        this.setState({
          loading: false
        });

        if (err) {
          throw err;
        }

        data = _.first(data);
        this.props.navigator.push({
          name: 'DetailView',
          title: row.t,
          text: data.text
        });
      });
    }
    else {
      this.props.navigator.push({
        name: 'CategoryView',
        title: row.t,
        tocRows: row.children
      });
    }
  }

  renderRow = row => {

    return (
      <TouchableHighlight key={row.index} style={styles.rowContainer} underlayColor={'#cccccc'} onPress={this.onRowClicked.bind(this, row)}>
        <View style={styles.rowView}>
          <Text style={{paddingLeft: 14, height: 32}}>{row.t}</Text>
          <Icon name="ion|chevron-right" style={{width: 16, height: 16, marginTop: 4, marginRight: 10}} size={16} color={'#555555'} />
        </View>
      </TouchableHighlight>
    );
  }

  onEndReached = () => {
    console.log('onEndReached');
  }

  goBack = () => {
    this.props.navigator.pop();
  }

  render() {

    if (this.state.loading) {

      let spinnerProps = {
        name: 'ion|load-c',
        size: 24,
        color: '#777',
        style: styles.stylesSpinner
      };

      return (
        <View style={styles.viewSpinner}>
          <Spinner {...spinnerProps} />
        </View>
      );
    }

    let listViewProps = {
      dataSource: this.state.dataSource,
      renderRow: this.renderRow,
      onEndReached: this.onEndReached
    };

    return (
      <View style={styles.container}>
        {this.renderBackButton()}
        <ListView {...listViewProps} />
      </View>
    );
  }

  canShowBackButton = () => {
    return this.props.navigator.getCurrentRoutes().length > 1;
  }

  renderBackButton() {

    if (this.canShowBackButton()) {
      let {title} = this.props;
      return (
        <View style={styles.navbar}>
          <TouchableHighlight onPress={this.goBack} style={styles.backButton} underlayColor={'#ecf0f1'}>
            <Icon name="ion|chevron-left" style={{width: 22, height: 22}} size={22} color={'#555555'} />
          </TouchableHighlight>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    }
  }
}

export default CategoryView;
