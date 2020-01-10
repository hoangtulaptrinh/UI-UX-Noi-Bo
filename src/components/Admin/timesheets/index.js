import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import './styles.css';
import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import classNames from 'classnames'
import DateRangePicker from '../../DateRangePicker'

function Timesheets(props) {
  const [id, setID] = useState(null);
  const { allUser, errorCode, staffTimeSheet, dateRangePicker } = props
  console.log(staffTimeSheet)
  const [type, setType] = useState('All');
  let array = [];
  if (type === 'All') {
    array = staffTimeSheet.data;
  }
  if (type === 'In late') {
    array = _.filter(staffTimeSheet.data, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm")))
  }
  if (type === 'Leave early') {
    array = _.filter(staffTimeSheet.data, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm")))
  }
  useEffect(() => {
    props.getInfoCurrentUser();
    props.getAllUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (id !== null) {
      props.getStaffTimeSheetByAdmin(dateRangePicker, id)
    }
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (id !== null) {
      props.getStaffTimeSheetByAdmin(dateRangePicker, id);
    }
    // eslint-disable-next-line
  }, [dateRangePicker]);
  //start code datalist
  //sự kiện change của input khi bấm vào data lists
  $(document).on('change', 'input', function () {
    var options = $('datalist')[0].options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === $(this).val()) {
        // lấy ra id của option tag và gán vào state id
        setID($("#users option[value='" + $('#someid').val() + "']").attr('data-id'));
        break;
      }
    }
  });
  //end code datalist
  return (
    <main>
      {/* breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <nav id="breadcrumb-body" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Timeshesst</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* breadcrumb end */}
      {/*tables-saffs  */}
      <div className="tables-saffs-wrapper">
        <div className="container-fluid">
          <div className="saffs-body">
            <div className="saffs-search">
              <div className="times-select">
                <DateRangePicker />
              </div>
              <div className="saffs-search-content">
                <form className="form-inline">
                  <div>
                    <input className="form-control mr-sm-2" type="search" list="users" id="someid" />
                    <datalist id="users" className="datalist scrollable">
                      {_.map(allUser, (item, index) => (
                        <option data-id={item.id} value={item.name} key={index} >{item.mail}</option>
                      ))}
                    </datalist>
                  </div>
                  <button className="btn btn-search my-2 my-sm-0" type="submit"><i className="fas fa-search" /></button>
                </form>
              </div>
            </div>
            {array === undefined ? null :
              <div>
                <div className="tables-title">
                  <div className="tables-title-item" onClick={() => setType('All')}>{`All: ${staffTimeSheet.data.length}`}</div>
                  <div className="tables-title-item" onClick={() => setType('In late')}>{`In late: ${_.filter(staffTimeSheet.data, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm"))).length}`}</div>
                  <div className="tables-title-item" onClick={() => setType('Leave early')}>{`Leave early: ${_.filter(staffTimeSheet.data, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm"))).length}`}</div>
                  <div className="tables-title-item">{`Paid leave: ${_.filter(staffTimeSheet.data, n => n.status === 'paid leave').length}`}</div>
                  <div className="tables-title-item">{`Unpaid leave: ${_.filter(staffTimeSheet.data, n => n.status === 'unpaid leave').length}`}</div>
                </div>
                <div className="saffs-table-content">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>CheckIn</th>
                        <th>Checkout</th>
                        <th>Status</th>
                        <th>Report</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {_.map(array, (item, index) => (
                        <tr key={index}>
                          <td>{item.date}</td>
                          <td
                            className={classNames('', {
                              red_text: moment(item.start_at, "hh:mm").isAfter(moment('8:00', "HH:mm")) === true
                            })}
                          >
                            {item.start_at}
                          </td>
                          <td
                            className={classNames('', {
                              red_text: moment(item.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm")) === true
                            })}
                          >
                            {item.end_at}
                          </td>
                          <td
                            className={classNames('', {
                              red_text: item.status === 'unpaid leave',
                              green_text: item.status === 'paid leave'
                            })}
                          >
                            {item.status}
                          </td>
                          <td
                            className={classNames('', {
                              red_text: item.report === 'No'
                            })}
                          >
                            {item.report}
                          </td>
                          <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                        </tr>
                      ))}
                    </tbody>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>CheckIn</th>
                        <th>Checkout</th>
                        <th>Status</th>
                        <th>Report</th>
                        <th />
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/*tables-saffs end */}
    </main>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    errorCode: state.errorCode,
    allUser: state.allUser,
    staffTimeSheet: state.staffTimeSheet,
    dateRangePicker: state.dateRangePicker
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    getAllUser: () => { dispatch(actions.getAllUser()) },
    getStaffTimeSheetByAdmin: (date, id) => { dispatch(actions.getStaffTimeSheetByAdmin({ date: date, id: id })) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);