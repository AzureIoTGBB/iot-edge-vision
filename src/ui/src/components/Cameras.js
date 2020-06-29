import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Cameras extends Component {
    state = {
        cameras: [
            // {
            //     "id": "1",
            //     "image": "https://sm.mashable.com/t/mashable_sea/news/s/security-c/security-camera-captures-creepy-creature-and-everyone-has-a_8rw4.1200.png",
            //     "name": "Night Cam",
            //     "type": "infrared",
            //     "location": "Room 34",
            //     "_rid": "59UBANW67qwBAAAAAAAAAA==",
            //     "_self": "dbs/59UBAA==/colls/59UBANW67qw=/docs/59UBANW67qwBAAAAAAAAAA==/",
            //     "_etag": "\"0c01e5b5-0000-0700-0000-5ee17bf40000\"",
            //     "_attachments": "attachments/",
            //     "_ts": 1591835636
            // },
            // {
            //     "id": "2",
            //     "image": "https://sm.mashable.com/t/mashable_sea/news/s/security-c/security-camera-captures-creepy-creature-and-everyone-has-a_8rw4.1200.png",
            //     "name": "Thermo Cam",
            //     "type": "Heat",
            //     "location": "Drive Way",
            //     "_rid": "59UBANW67qwCAAAAAAAAAA==",
            //     "_self": "dbs/59UBAA==/colls/59UBANW67qw=/docs/59UBANW67qwCAAAAAAAAAA==/",
            //     "_etag": "\"0c0108b4-0000-0700-0000-5ee17bc10000\"",
            //     "_attachments": "attachments/",
            //     "_ts": 1591835585
            // }
        ]
    }
    componentDidMount() {
        axios.get(`https://besafe.azurewebsites.net/api/camera`)
        .then(res => {
          const cameras = res.data;
          this.setState({ cameras });
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
                                    <h4 class="card-title">Cameras</h4>
                                </div>
                                <div class="card-body table-full-width table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>Type</th>
                                            <th>Last Image</th>
                                        </thead>
                                        <tbody>
                                        {this.state.cameras.map((camera, index) => {
                                        return (
                                        <tr key={camera.id}>
                                            <td>{camera.name}</td>
                                            <td>{camera.location}</td>
                                            <td>{camera.type}</td>
                                            <td><img src = {camera.image} width = '100'></img></td>
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

export default Cameras