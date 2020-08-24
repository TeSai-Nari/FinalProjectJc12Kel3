import React, {Component} from 'react'
import {connect} from 'react-redux'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView} from "mdbreact";
import {
    Card,  CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../supports/Apiurl';
import Numeral from 'numeral'
import {BukanHome,IniHome} from './../redux/actions'
import { Link } from 'react-router-dom'
import SquareButton from '../components/button'

class Home extends Component {
    state = { 
        photos:['./image/cover/cover_a.jpg','./image/cover/cover_b.jpg','./image/cover/cover_c.jpg'],
        products:[],
        category:[]
     }

     async componentDidMount(){
        try {
            var res=await Axios.get(`${API_URL}/product/getprod`)
            this.setState({categories:res.data.category,products:res.data.product})
            console.log(res.data.product)
        } catch (error){
            console.log(error)
        }
    } 

    componentWillUnmount=()=>{
        this.props.BukanHome()
    }

    renderphoto=()=>{
        return this.state.photos.map((val, index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100', height:'80vh'}}>
                            <img
                                src={val}
                                alt="First slide"
                                width="100%"
                            />
                        </div>
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        var bestseller= this.state.products.slice(5,10)
        return bestseller.map((val,index)=>{
            return(
                <div key={index} className="p-4" style={{width:'20%'}}>
                    <div>
                        <Card className="text-center no-shadow" style={{fontSize:'13px'}}>
                            <div style={{height:191, width:'100%'}}>
                                <img src={API_URL+val.image} width="100%" height="100%" alt=""/>
                                <div className="kotak-hitam">
                                    <Link to={`/productdetail/${val.id}`}>
                                    <button className="tombol-buynow">Product Detail</button>
                                    </Link>
                                </div>
                            </div>
                            <CardBody style={{height:120}}>
                                <div style={{fontSize:"12px"}} className="my-pink text-uppercase">{val.type}</div>
                                <CardTitle style={{height:50}} className="mb-2">{val.name}</CardTitle>
                                <CardSubtitle>{'IDR '+Numeral(val.price).format(0.0)}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )
        })
    }



    render() { 
            return ( 
                <div className='mt-5 pt-1'>
                    <MDBCarousel
                        activeItem={1}
                        length={this.state.photos.length}
                        showControls={true}
                        showIndicators={true}
                        className="z-depth-1"
                    >
                        <MDBCarouselInner>
                            {this.renderphoto()}
                        </MDBCarouselInner>
                    </MDBCarousel>
                    <div> 
                        <div> 
                            <h3 className="text-center mt-5 text-uppercase"> Our Products </h3>
                        </div>
                        <div className="d-flex px-5 ">
                            {this.renderProducts()}
                        </div>
                    </div>
                    <div className="m-3 text-center">
                        <Link to={`/productpage`}>
                            <SquareButton isfunction={false} text={"See all products"}/>
                        </Link>
                    </div>
                </div>
             );
        }
    }

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }

}

export default connect(MapstatetoProps,{BukanHome, IniHome}) (Home);