import React, { Component } from "react";
import '../css/dashBoardStyle.css';
import userLogo from '../../assets/user-icon.png';
import clockLogo from '../../assets/clock-icon.png';
import locationLogo from '../../assets/location-icon.png';
import {
    backgroundUserImage,
    orangeColor,
    orangeBlur,
    userIcon,
    greyColor,
    ipAddress
} from '../../contants';
import axios from "axios";
const localStorage = require('local-storage');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastRides: [],
            instanceOrders: ['1'],
            requests: [],
            avaiOrders: [],
            driverInfor: {}
        }
        this.getInformation = this.getInformation.bind(this);
        this.getAvailableOrders = this.getAvailableOrders.bind(this);
    }

    componentDidMount() {
        this.getInformation();
        this.getAvailableOrders();
    }

    // Hàm lấy thông tin
    async getInformation() {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/driver-view/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                driverInfor: response.data
            });
            axios.get(`${ipAddress}/api/update-location?driver_id=${response.data.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (response) => {
                await this.setState({
                    lastRides: response.data
                });
                axios.get(`${ipAddress}/api/order-drivers?driver_id=${this.state.driverInfor.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    this.setState({
                        requests: response.data
                    });
                    var tmpList = [];
                    tmpList = this.state.requests;
                    for(let i=0; i<tmpList.length; i++) {
                        var requestName = '';
                        if(tmpList[i].request_option == 1) {
                            requestName = 'Giục lấy'
                        } else if(tmpList[i].request_option == 2) {
                            requestName = 'Giao';
                        } else if(tmpList[i].request_option == 3) {
                            requestName = 'Trả hàng';
                        }
                        tmpList[i].request_option = requestName;
                    }
                    this.setState({
                        requests: tmpList
                    });
                })
                .catch((error) => {
                    console.log('Error');
                });
            })
            .catch((error) => {
                console.log('Error!');
            });
        }).
        catch((error) => {
            console.log('Error!');
        });
    }

    getAvailableOrders = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/available-order/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                avaiOrders: response.data
            });
            console.log(this.state.avaiOrders);
        })
        .catch((error) => {
            console.log('Error');
        });
    }

    // Hàm xử lý sự kiện xử lý request của khách hàng
    handleRequest = () => {
        console.log('Handle');
    }

    // Màn hình hiển thị khi danh sách last ride rỗng
    emptyLastRides = () => {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                Không tồn tại chuyến xe
            </div>
        );
    }

    // Màn hình hiển thị chuyến xe hiện tại
    instanceOrder = () => {
        if(this.state.instanceOrders.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderWrapper'>
                    
                </div>
            );
        } else {
            // Hiển thị khi không có đơn hàng nào hiện đang giao
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    Không có đơn hàng nào
                </div>
            );
        }
    }

    // Màn hình hiển thị khi tồn tại danh sách last ride
    instanceOrderRequets = () => {
        const renderListofRequest = this.state.requests.map((item, index) => {
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    {/* Phần hiển thị thời gian của request */}
                    <p className = 'requestTimeFontStyle'>{item.time}</p>
                    <div className = 'requestMsgWrapper'>
                        <p className = 'requestMsgFontStyle'>{item.request_option}</p>
                    </div>
                </div>
            );
        })
        if(this.state.requests.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderRequestWrapper'>

                    {/* Title Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <div style = {{
                            height: '42px',
                            widows: '42px',
                            border: 'solid 0.5px grey',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyItems: 'center',
                            borderRadius: '40px',
                            padding: '1px',
                            marginRight: '20px'
                        }}>
                            <img src = {userLogo} style = {{
                                height: '40px',
                                width: '40px',
                            }}></img>
                        </div>
                        <p 
                            style = {{
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}
                        >
                            Yêu cầu của đơn hàng
                        </p>
                    </div>

                    {/* Request Items Wrapper */}
                    <div className = 'dashBoardInstanceOrderRequestItemsWrapper'>

                        {/* Item request wrapper */}
                        {renderListofRequest}
                    </div>
                </div>
            );
        } else {
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                Không có yêu cầu nào
            </div>
        }
    }

    // Màn hình hiển thị danh sách các đơn hàng hiện có
    availableOrder = () => {
        if(this.state.avaiOrders.length > 0) {
            return(
                <div className = 'dashBoardAvaiOrdersWrapper'>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>Đơn hàng hiện có</p>
                    <div className = 'dashBoardAvaiOrdersItem'>
                        <img src = {userLogo} style = {{
                            height: '40px',
                            width: '40px'
                        }}></img>
                        <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                            <p>Extra Fast</p>
                            <p style = {{
                                color: 'grey'
                            }}>Huynh Quan Nhat Hao</p>
                        </div>
                        <p>- 25000VND</p>
                    </div>

                    {/* Item */}
                    <div className = 'dashBoardAvaiOrdersItem'>
                        <img src = {userLogo} style = {{
                            height: '40px',
                            width: '40px'
                        }}></img>
                        <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                            <p>Extra Fast</p>
                            <p style = {{
                                color: 'grey'
                            }}>Huynh Quan Nhat Hao</p>
                        </div>
                        <p>- 25000VND</p>
                    </div>
                </div>
            );
        } else {
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    Không có đơn hàng nào
                </div>
            );
        }
    }

    lastRides = () => {
        const listOfLastRides = this.state.lastRides.map((item, index) => {
            return(
                <div class = 'dashBoardLastRideItem' key = {index}>
                    {/* Danh sách vận chuyển của đơn hàng cuối cùng */}
                    <div style = {{
                        height: '63px',
                        width: '63px',
                        border: '0.5px solid grey',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '10px'
                    }}>
                        <img src = {clockLogo}  style = {{
                            height: '60px',
                            width: '60px',
                        }}></img>
                    </div>
                    <div style = {{
                        marginLeft: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0'
                    }}>
                        <p className = 'dashBoardTextStyle2'>{item.time}</p>
                        <p>
                            <img src = {locationLogo} height = '30px' width = '30px' style = {{marginRight: '10px'}}></img>
                            {item.ward}, {item.province}, {item.city}
                        </p>
                    </div> 
                </div>
            );
        });
        if (this.state.lastRides.length > 0) {
            return(
                <div className = 'dashBoardLastRide'>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '5px',
                        
                    }}>
                        <p style = {{
                            fontSize: '25px',
                            fontWeight: 'bold'
                        }}>Chuyến xe cuối</p>
                    </div>
                    {listOfLastRides}
                </div>
            );
        } else  {
            return (
                this.emptyLastRides()
            );
        }
        
    }


    render() {
        return(
            <div className = 'dashBoardContainer'>
                {/* Cột thứ nhất */}
                <div className = 'dashBoardCol1'>
                    <div className = 'dashBoardUser'>
                        <div style = {{
                            marginTop: '20px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            marginBottom: '20px',
                            height: '90%',
                            width: '90%',
                            borderColor: "black",
                            borderRadius: '30px',
                            backgroundColor: 'rgba(0,0,0, 0.4)',
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '20px',
                            
                        }}>
                            <p style = {{
                                color: '#FFF',
                                fontWeight: 'bold'
                            }}>Thông tin tài xế</p>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                border: '0.5px solid grey',
                                padding: '10px',
                                width: '99%',
                                borderRadius: '20px'
                            }}>
                                <div style = {{
                                    display: "flex",
                                    flexDirection: 'column'
                                }}>
                                    <p className = 'dashBoardTextStyle'>{this.state.driverInfor.name}</p>
                                    <p className = 'dashBoardTextStyle'>{this.state.driverInfor.phone_number}</p>
                                </div>
                                <img src = {userLogo} style = {{
                                    marginLeft: '50px',
                                    height: '80px',
                                    width: '80px'
                                }}/>
                            </div>
                            <div style = {{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: '10px',
                                border: '0.5px solid grey',
                                width: '99%',
                                borderRadius: '20px',
                                padding: '10px',
                            }}>
                                <p className = 'dashBoardTextStyle'>Bằng lái xe: {this.state.driverInfor.driverLicense}</p>
                                <p className = 'dashBoardTextStyle'>Username: {this.state.driverInfor.username}</p>
                            </div>
                        </div>
                    </div>
                    {this.lastRides()}
                </div>

                {/* Cột thứ hai */}
                <div className = 'dashBoardCol1'>
                    {this.instanceOrder()}
                    {this.instanceOrderRequets()}
                </div>

                {/* Cột thứ ba */}
                <div className = 'dashBoardCol1'>
                    {this.availableOrder()}
                </div>
            </div>
        );
        
    }
}

export default Dashboard;