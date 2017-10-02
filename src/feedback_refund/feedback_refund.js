/**
 * Created by qinshiju on 2017/7/8.
 */
import React, {Component} from 'react';
import 'whatwg-fetch';

import Config from '../common/config';
import './feedback_refund.css';
import '../common/anyway';
import MPConfig from '../common/mp_config'
import QueryString from 'query-string';

let timer = null;

class feedbackRefund extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mid: ''
        }
        if(props.location.search && props.location.search.length>0){
            let conversationId =  props.location.search.substring(props.location.search.indexOf('=')+1,props.location.search.length)
            this.state={conversationId:conversationId}
            console.log(conversationId)
        }else{
            let conversationId = null
            this.state={conversationId:conversationId}
            console.log(conversationId)
        }
    }

    componentDidMount() {
        MPConfig()
        document.title = '我要退款';
        timer = setTimeout(function () {
            window.wx.ready(() => {
                window.wx.hideOptionMenu()
            });
        }, 500);
        let parsed=QueryString.parse(this.props.location.search);
        this.setState({
            mid:parsed.mid==undefined?'':parsed.mid
        })
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    submit() {
        let url = Config.api.feedback;
        if (this.refs.text.value != '' && (/^1(3|4|5|7|8)\d{9}$/.test(this.refs.mobilePhone.value))) {
            let param = {
                "mobilePhone": this.refs.mobilePhone.value,
                "content": this.refs.text.value,
                "machineId": this.state.mid,
                "items": [],
                "type": 1,
                "conversationId":this.state.conversationId
            };
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            }).then((res) => {
                return res.json()
            }).then((res) => {
                if (res.status == 0) {
                    window.location.href = '/feedback_refund/refund';
                } else {
                    alert("提交失败")
                }

            });
        } else {
            alert('请填写反馈的内容以及正确的手机号')
        }

    }

    render() {
        return (
            <div>
                <textarea name="手机号" ref="mobilePhone" classID="textIpone" placeholder="手机号"></textarea>
                <textarea name="请您详细描述遇到的问题，以便小糖为您尽快处理" ref="text" classID="text" placeholder="详情描述" style={{height: "10rem"}}></textarea>

                <div className="backWhite">
                    <input type="submit" name="" value="提交" classID="submit" className="submit"
                           onClick={this.submit.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default feedbackRefund