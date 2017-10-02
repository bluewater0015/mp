import React,{Component} from 'react'
import enjoy from './images/enjoy.png'
import noenjoy from './images/noenjoy.png'
import {Link} from 'react-router-dom'
import MPConfig from '../common/mp_config'
import './evaluate_success.css'

class evaluateSuccess extends Component{
    constructor(props){
        super(props)
        const selectSatisfy = props.location.query !== undefined && props.location.query.satisfy !== undefined ?props.location.query.satisfy:1
        const selectPrice = props.location.query !== undefined && props.location.query.price !== undefined ?props.location.query.price:0
        const selectIsRefund = props.location.query !== undefined && props.location.query.isRefund !== undefined ?props.location.query.isRefund:true
        this.state = {satisfy:selectSatisfy,price:selectPrice,isRefund:selectIsRefund}
        console.log(this.state.isRefund)
    }
    componentDidMount(){
        MPConfig()
        document.title = '评价完成'
        window.wx.ready(()=> {
            window.wx.hideOptionMenu()
        });
    }
    render(){
        const {satisfy,price,isRefund} = this.state
        return(
            <div className='evaluate-success'>
               <div>
                   <div className='evaluate-head'>
                       {satisfy === 1?<img src={enjoy} className="evaluate-enjoy"/>:<img src={noenjoy} className="evaluate-noenjoy"/>}
                   </div>
               </div>
                {
                    satisfy === 1?<div>
                        <p className="evaluate-font">感谢您的评价</p>
                        <p>祝您生活愉快，欢迎再来哟</p>
                    </div>:<div><div>
                            <p className="evaluate-font">感谢评价</p>
                            <p>很抱歉给您带来不好的体验,</p>
                            <p className="evaluate-font">小糖会努力改进的</p>
                        </div>
                        {price !== 0 && isRefund ?<div className="center"><Link to='/feedback_refund'><button>我要退款</button></Link></div>:''}
                    </div>
                }
            </div>
        )
    }
}
export default evaluateSuccess