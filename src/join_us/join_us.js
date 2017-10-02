import './join_us.css';
import React,{ Component } from 'react';
import Text from '../components/text/text';
import {CityPicker} from 'react-weui'
import cnCity from './address';
import 'weui'
import starImg from './images/Star.png';
import successImg from './images/success.png';
import failImg from './images/fail.png';
import closeImg from './images/close.jpg';
import 'whatwg-fetch';

export default class joinUs extends Component{
    constructor(props){
        super(props);
        this.state = {
            //填写的信息
            username: '',
            userphone: '',
            usermail: '',
            remark: '',
            provinceName: '',
            cityName:'',
            //模态框
            isShowMoadl: false,
            isShowCatchModal: false,
            isShowSuccessModal: false,

            //输入错误的提示
            name_tips: false,
            phone_tips: false,
            mail_tips: false,
            remark_tips: false,
            province_city_tips: false,

            //为空的提示
            name_tips_empty: false,
            phone_tips_empty: false,
            mail_tips_empty : false,
            province_city_tips_empty: false,
            //模态框遮罩
            isShade: false,
            city_show: false,
            city_value: ''
        }
    }
    //点击提交
    submitEvent(){
        console.log(this.state);
        var value = this.state.username && this.state.userphone
            && this.state.provinceName && this.state.cityName
            && (!this.state.name_tips) && (!this.state.phone_tips)
            && (!this.state.mail_tips) &&(!this.state.remark_tips)
            && (!this.state.province_city_tips);
        if(value){
            this.submitData();
        }else{
            this.setState({
                isShowMoadl: true,
                isShade: true,
                // name_tips: true,
                // phone_tips: true,
                // province_city_tips: true,
            })
        }
    }
    //请求数据
    submitData(){
        let url = "/api/franchisee/join";
        let param ={
            'franchiseeName':this.state.username,
            'cellPhone':this.state.userphone,
            'provinceName':this.state.provinceName,
            'cityName':this.state.cityName,
            'emailAddress': this.state.usermail,
            'remark': this.state.remark
        }
        const request = new Request(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        return fetch(request).then(res=>{
            return res.json()
        }).then(data=>{
            console.log('submitData',data);
            //数据请求过来了证明已经提交信息成功，所以展示成功弹出框
            if(data.result === 0){
                this.setState({
                    isShowSuccessModal: true,
                    isShade: true
                })
            }
        }).catch(err=> {
            //console.log(err);
            this.setState({
                isShowCatchModal: true,
                isShade: true
            })
        })
    }
    //如何校验姓名
    checkNameEvent(e){
        this.setState({
            username: e.target.value,
        },()=>{
            var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
            if(!(reg.test(this.state.username))){
                //console.log('请输入正确的用户名');
                this.setState({
                    name_tips: true
                })
            }else{
                this.setState({
                    name_tips: false
                })
            }
        })
    }
    //校验电话号码
    checkPhoneEvent(e){
        //console.log('aa');
        this.setState({
            userphone: e.target.value,
        },()=>{
            var reg = /^1[34578]\d{9}$/;
            //console.log(this.state.userphone);
            if(!(reg.test(this.state.userphone))){
                console.log('请输入正确的手机号码');
                this.setState({
                    phone_tips: true
                })
            }else{
                this.setState({
                    phone_tips: false
                })
            }
           
        })

    }
    //校验城市
    selectEvent(value1,value2){
        this.setState({
            provinceName: value1,
            cityName: value2
        },()=>{
            if(value1&&value2){
                //console.log('没有选城市');
                this.setState({
                    province_city_tips: false
                })
            }else{
                this.setState({
                    province_city_tips: true
                })
            }
        });
    }
    onchangeEvent(){
        //console.log('ww');
        if(this.state.city_value = ''){
            this.setState({
                province_city_tips: true
            })
        }else{
            this.setState({
                province_city_tips: false
            })
        }
    }
    onCancelEvent(){
        this.setState({
            city_show: false
        })
        if( this.state.city_value == ''){
            this.setState({
                province_city_tips: true
            })
        }else{
            this.setState({
                province_city_tips: false
            })
        }
    }
    //校验邮件
    checkMailEvent(e){
        this.setState({
            usermail: e.target.value
        },()=>{
            
            if(this.state.usermail){
                var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                //console.log(this.state.usermail);
                if(!(reg.test(this.state.usermail))){
                    this.setState({
                        mail_tips: true
                    })
                }else{
                    this.setState({
                        mail_tips: false
                    })
                }
            }else{
                console.log('邮箱选填');
            }
        })
    }
    //校验textarea框中的内容
    checkRemark(e){
        //console.log('checkRemark');
        this.setState({
            remark: e.target.value
        },()=>{
            if( this.state.remark.length > 140 ){
                this.setState({
                    remark_tips: true
                })
            }else{
                this.setState({
                    remark_tips: false
                })
            }
        })
    }
    textareaOnChange(e){
        this.setState({
            remark: e.target.value
        })
    }
    //关闭成功的模态框时，所有的信息都清空
    closeSuccessHandle(){
        this.setState({
            isShowSuccessModal: false,
            isShade: false,
            username: '',
            userphone: '',
            usermail: '',
            remark: '',
            provinceName: '',
            cityName:'',
            city_value: ''
        })
    }

    /*关闭异常时模态框*/
    closeCatchHandle(){
        this.setState({
            isShowCatchModal: false,
            isShade: false
        })
    }
    //关闭失败模态框
    closeHandle(){
        this.setState({
            isShowMoadl: false,
            isShade: false,
        })
    }
    //成功时的模态框
    successModal(){
        return (
            <div className="join-modal">
                <div className="join-modal-content center">
                    <img src={ closeImg } alt="" className="join-cancel-img" onClick={this.closeSuccessHandle.bind(this)}/>
                    <img className="failImg" src={ successImg } alt="" />
                    <div className="submit_success">申请提交成功!</div>
                    <div className="describe join-message">
                        <p className="center">工作人员将第一时间回访，</p>
                        <p className="center">请您耐心等待！</p>
                    </div>
                </div>
            </div>
        )
    }
    // 失败时的模态框
    failModal(){
        return (
            <div className="join-modal">
                <div className="join-modal-content center">
                    <img src={ closeImg } alt="" className="join-cancel-img" onClick={this.closeHandle.bind(this)}/>
                    <img className="failImg" src={ failImg } alt="" />
                    <div className="join-message-tips">
                        <div className="message_font center">您填写的信息不完整，请</div>
                        <div className="message_font center">修改后重新提交</div>
                    </div>
                </div>
            </div>
        )
    }

    //提交时网络异常或着其他情况的modal
    catchModal(){
        return (
            <div className="join-modal">
                <div className="join-modal-content center">
                    <img src={ closeImg } alt="" className="join-cancel-img" onClick={this.closeCatchHandle.bind(this)}/>
                    <img className="failImg" src={ failImg } alt="" />
                    <div className="join-message-tips">
                        <p className="center message_font">当前网络或者服务器异常</p>
                    </div>
                </div>
            </div>
        )
    }
    onchange(text){
        let text1 = text;
        text1 = text1.split(" ");
        this.setState({city_value:text,provinceName: text1[0], cityName: text1[1],city_show:false});
        if(this.state.city_value){
            this.setState({
                province_city_tips: false
            })
        }else{
            province_city_tips: true
        }
    }
    clickEvent(){
        this.setState({city_show: true});
    }
    nameChange(e){
        this.setState({username:e.target.value})
    }
    phoneChange(e){
        this.setState({userphone:e.target.value})
    }
    emailChange(e){
        this.setState({usermail:e.target.value})
    }

    render(){
        return (
            <div className="joinus_container">
                <div className="joinus center">
                    <i></i>
                    <img src={ starImg } alt="" />
                    <span className="partner center">诚招星糖合伙人</span>
                    <img src={ starImg } alt="" />
                    <i></i>
                </div>
                <p className="join-title center">加入星糖，即可启程</p>

                <div className="wrap-joinus">
                    <div className="join_username">
                        <label>姓名<span className="join_must">*</span>：</label>
                        <input onBlur={ this.checkNameEvent.bind(this)} value={this.state.username} onChange={this.nameChange.bind(this)}/>
                    </div>
                    <div>
                        {
                            this.state.name_tips ?
                                <Text tips="请填写姓名（10个字以内）" />:''
                        }
                    </div>
                    <div>
                        {
                            this.state.name_tips_empty ?
                                <Text tips="请填写姓名" />:''
                        }
                    </div>
                    <div className="join_username">
                        <label>手机<span className="join_must">*</span>：</label>
                        <input onBlur={ this.checkPhoneEvent.bind(this)} value={this.state.userphone} onChange={this.phoneChange.bind(this)}/>
                    </div>
                    <div>
                        {
                            this.state.phone_tips ?
                                <Text tips="请填写正确的手机号码" />:''
                        }
                    </div>
                    <div>
                        {
                            this.state.phone_tips_empty ?
                                <Text tips="电话号码不能为空" />:''
                        }
                    </div>
                    <div className="join_username" onClick={()=>this.clickEvent()}>
                        <label className="city_label">城市<span className="join_must">*</span>：</label>

                        <span className="join-cityname">{this.state.city_value}</span>
                        <CityPicker
                            data={cnCity}
                            onCancel={ this.onCancelEvent.bind(this)}
                            onChange={text=>this.onchange(text)}
                            show={this.state.city_show}
                        />
                    </div>
                    <div>
                        {
                            this.state.province_city_tips ?
                                <Text tips="省、市不能为空" />:''
                        }
                    </div>
                    <div>
                        {
                            this.state.province_city_tips_empty ?
                                <Text tips="省和市不能为空" />:''
                        }
                    </div>
                    <div className="join_username">
                        <label>邮箱<span className="mail_star">*</span>：</label>
                        <input type="text" onBlur={ this.checkMailEvent.bind(this)} value={this.state.usermail } onChange={this.emailChange.bind(this)}/>
                    </div>
                    <div>
                        {
                            this.state.mail_tips ?
                                <Text tips="请填写正确的邮箱" /> :''
                        }
                    </div>

                    <div className="join_textarea">
                        <label>备注<span className="mail_star">*</span>:</label>
                        <textarea
                            className = "remark_fontSize"
                            value={ this.state.remark }
                            onChange={(e) => this.textareaOnChange(e)}
                            onBlur={ this.checkRemark.bind(this)}
                        ></textarea>
                    </div>
                    <div>
                        {
                            this.state.remark_tips ?
                                <Text tips="限制140字" /> :''
                        }
                    </div>

                    <div className="joinus-btn" onClick={this.submitEvent.bind(this)}>
                        提交
                    </div>

                </div>

                <div className="joinus-tel center">
                    加盟电话：400-7008-963 转3
                </div>
                {
                    this.state.isShade ? <div className="shade"></div>: null
                }

                {
                    this.state.isShowSuccessModal ? this.successModal() : null
                }
                {
                    this.state.isShowMoadl ? this.failModal() : null
                }
                {
                    this.state.isShowCatchModal ? this.catchModal() : null
                }
            </div>
        )
    }
}
