import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    headerFontSize,
    backIcon,
    appFontSize,
    newIcon
} from '../contants';


class AppInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            headerTitle: this.props.route.params.title
        });
    }

    renderHeader() {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.iconBackWrapper}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source = {backIcon}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
                <View style = {{alignItems: 'center', flex: 1}}>
                    <Text style = {styles.nameWrapper}>{this.props.route.params.title}</Text>
                </View>
            </View>
        );
    }

    renderDieuKhoanSuDung() {
        return(
            <View style={styles.dieuKhoanWrapper}>
                <Text style={styles.textInformation}>Công ty cổ phần Huỳnh Quan Nhật Hào: là một công ty công nghệ hoạt động kinh doanh trong lĩnh vực bưu chính</Text>
                <Text style={styles.textInformation}>Tên doanh nghiệp: CÔNG TY CỔ PHẦN GIAO HÀNG HUỲNH QUAN NHẬT HÀO</Text>
                <Text style={styles.textInformation}>Email: haob1809687@student.ctu.edu.vn</Text>
            </View>
        );
    }

    renderQuestions() {
        return(
            <View>
                <Text>Question</Text>
            </View>
        );
    }

    renderNews() {
        return(
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    alignItems: 'center'
                }}
            >
                <View style={styles.newsDetailWrapper}>
                    <View style={styles.newTitleWrapper}>
                        <Image
                            source = {newIcon}
                            style={styles.newIcon}
                        ></Image>
                        <Text style={styles.newTitle}>THÔNG BÁO ĐANG LÀM ĐỀ TÀI</Text>
                    </View>
                    <Text style={styles.textInformation}>Huỳnh Quan Nhật Hào</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        const title = this.props.route.params.title;
        console.log(title);
        if(title === 'Điều khoản và quy định') {
            return(
                this.renderDieuKhoanSuDung()
            );
        } 
        else if(title === 'Những câu hỏi thường gặp') {
            return(
                this.renderQuestions()
            );
        }
        return(
            this.renderNews()
        );
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ff7733',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 65
    },  
    nameWrapper: {
        // left: 140,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    dieuKhoanWrapper: {
        flexDirection: 'column',
        marginTop: 10
    },
    textInformation: {
        fontSize: appFontSize
    },
    newsDetailWrapper: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFF',
        width: '92%',
        borderRadius: 10
    },
    newTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    newIcon: {
        width: 40,
        height: 40
    },
    newTitle: {
        fontSize: appFontSize,
        color: '#ff7733'
    }
});

export default AppInformation;