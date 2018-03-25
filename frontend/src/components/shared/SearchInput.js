import React from 'react';
import PropTypes from 'prop-types'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

export class SearchInput extends React.Component {
  static propsTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.ref.value = this.props.value || '';

    Observable.fromEvent(this.ref, 'keyup')
      .map((e) => e.target.value)
      .debounceTime(500)
      .subscribe((value) => {
        this.props.onSearch(value);
      });
  }

  render() {
    return (
      <input
        type="test"
        className="form-control"
        ref={ref => this.ref = ref}
        placeholder={this.props.placeholder} />
    )
  }
}
