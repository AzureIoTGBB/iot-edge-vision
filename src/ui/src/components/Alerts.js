import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
var crypto = require("crypto");
var moment= require('moment') 


class Alerts extends Component {
    state = {
      alerts: [
        //   { "id": "1",
        //   "camera": 1,
        //   "datetime": "05/01/2020",
        //   "type": "4k",
        //   "image": "https://designpress.com/wp-content/uploads/2017/03/M1.jpg",
        //   "_rid": "59UBAMrVRhIBAAAAAAAAAA==",
        //   "_self": "dbs/59UBAA==/colls/59UBAMrVRhI=/docs/59UBAMrVRhIBAAAAAAAAAA==/",
        //   "_etag": "\"00006303-0000-0700-0000-5eb0bc8a0000\"",
        //   "_attachments": "attachments/",
        //   "_ts": 1588640906},
        //   {"id": "2",
        //   "camera": 1,
        //   "datetime": "05/04/2020",
        //   "type": "hardhat",
        //   "image": "https://designpress.com/wp-content/uploads/2017/03/M1.jpg",
        //   "_rid": "59UBAMrVRhICAAAAAAAAAA==",
        //   "_self": "dbs/59UBAA==/colls/59UBAMrVRhI=/docs/59UBAMrVRhICAAAAAAAAAA==/",
        //   "_etag": "\"0c01ee08-0000-0700-0000-5ee166890000\"",
        //   "_attachments": "attachments/",
        //   "_ts": 1591830153}
      ]
    }
    componentDidMount() {

        axios.get(`https://besafe.azurewebsites.net/api/alert`)
        .then(res => {
          const alerts= res.data;
          this.setState({ alerts });
        })
    }

    

    render() {
        return (
            <div className="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-plain table-plain-bg">
                                <div class="card-header ">
                                    <h4 class="card-title">Alerts</h4>
                                </div>
                                <div class="card-body table-full-width table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Tag</th>
                                            <th>Image</th>
                                        </thead>
                                        <tbody>
                                            {this.state.alerts.map((alert, index) => {
                                                return (
                                                <tr key={alert.id}>
                                                <td>{alert.id}</td>
                                                <td>{alert.datetime}</td>
                                                <td>{alert.camera}</td>
                                                <td>{alert.type}</td>
                                                <td><img src = {alert.image} width = '100'></img></td>
                                                </tr>
                                            )})}
                                        </tbody>
                                        

                                            
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Alerts