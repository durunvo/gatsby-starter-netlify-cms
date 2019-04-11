import React from 'react'
import { Row, Col, Divider, Icon } from 'antd'
import logo from '../img/logo.png'
import line from '../img/social/line.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row type="flex" justify="center">
          <div className="footer-inner">
            <Row type="flex" gutter={24}>
              <Col xs={24} sm={8} md={7} lg={5}>
                <img src={logo} style={{ height: 25 }} alt="Propachill" />
                <div className="socials">
                  <a title="facebook" href="https://facebook.com/propachill" target="_blank" rel="noopener noreferrer"><Icon type="facebook" style={{ fontSize: 28 }}/></a>
                  <a title="twitter" href="https://twitter.com/propachill" target="_blank" rel="noopener noreferrer"><Icon type="twitter" style={{ fontSize: 28 }}/></a>
                  <a title="instagram" href="https://instagram.com/propachill" target="_blank" rel="noopener noreferrer"><Icon type="instagram" style={{ fontSize: 28 }}/></a>
                  <a title="youtube" href="https://www.youtube.com/channel/UCZgaC-vpv07nEjOz-vdoowA" target="_blank" rel="noopener noreferrer"><Icon type="youtube" style={{ fontSize: 28 }}/></a>
                </div>
                <p><a title="tel" href="tel:0905392424" target="_blank" rel="noopener noreferrer"><Icon type="phone" style={{ fontSize: 20 }}/> 090 539 2424</a></p>
                <p><a title="mail" href="mailto:hello@propachill.com" target="_blank" rel="noopener noreferrer"><Icon type="mail" style={{ fontSize: 20 }}/> hello@propachill.com</a></p>
                <p><a title="line@" href="https://line.me/ti/p/@propachill" target="_blank" rel="noopener noreferrer"><img src={line} height="20" width="20" alt="line"/> @propachill</a></p>
              </Col>
              <Col xs={24} sm={16} md={17} lg={19}>
                <Row type="flex" gutter={24} >
                  <Col>
                    <h3>Listing</h3>
                    <p><a title="Quick rent" href="https://www.propachill.com/quickrent" target="_blank" rel="noopener noreferrer">List your property</a></p>
                    <p><a title="Contact" href="https://www.propachill.com/contact" target="_blank" rel="noopener noreferrer">Contact for new project</a></p>
                    <p><a title="Contact" href="https://www.propachill.com/contact" target="_blank" rel="noopener noreferrer">Contact for adverstisement</a></p>
                  </Col>
                  <Col>
                    <h3>Looking for rent</h3>
                    <p><a title="All" href="https://www.propachill.com/browse" target="_blank" rel="noopener noreferrer">All</a></p>
                    <p><a title="Deposit-free" href="https://www.propachill.com/browse?ppc=true" target="_blank" rel="noopener noreferrer">Deposit-free</a></p>
                    <p><a title="Condominium" href="https://www.propachill.com/browse?category=condo" target="_blank" rel="noopener noreferrer">Condominium</a></p>
                    <p><a title="House" href="https://www.propachill.com/browse?category=house" target="_blank" rel="noopener noreferrer">House, Townhouse, Home Office</a></p>
                    <p><a title="Apartment" href="https://www.propachill.com/browse?category=apartment" target="_blank" rel="noopener noreferrer">Apartment</a></p>
                  </Col>
                  <Col>
                    <h3>Top location</h3>
                    <p><a title="Chidlom, Pleonjit, Prime Sukhumvit" href="https://www.propachill.com/browse?location=chidlom" target="_blank" rel="noopener noreferrer">Chidlom, Pleonjit, Prime Sukhumvit</a></p>
                    <p><a title="New Petchburi, Rama 9, Ratchadapisek" href="https://www.propachill.com/browse?location=rama9" target="_blank" rel="noopener noreferrer">New Petchburi, Rama 9, Ratchadapisek</a></p>
                    <p><a title="Siphaya, Surawong, Silom, Sathorn" href="https://www.propachill.com/browse?location=silom" target="_blank" rel="noopener noreferrer">Siphaya, Surawong, Silom, Sathorn</a></p>
                    <p><a title="Patumwan, Phayathai, Rajprarop" href="https://www.propachill.com/browse?location=pathumwan" target="_blank" rel="noopener noreferrer">Patumwan, Phayathai, Rajprarop</a></p>
                    <p><a title="Ladprao, Raminthra" href="https://www.propachill.com/browse?location=ladprao" target="_blank" rel="noopener noreferrer">Ladprao, Raminthra</a></p>
                    <p><a title="Sukapiban, Ramkhamhaeng, Bangkapi" href="https://www.propachill.com/browse?location=ramkhamhaeng" target="_blank" rel="noopener noreferrer">Sukapiban, Ramkhamhaeng, Bangkapi</a></p>
                  </Col>
                  <Col>
                    <h3>Other</h3>
                    <p><a title="Blog" href="https://blog.propachill.com" target="_blank" rel="noopener noreferrer">Blog</a></p>
                    <p><a title="Help" href="https://propachill.zendesk.com/hc/th" target="_blank" rel="noopener noreferrer">Help</a></p>
                    <p><a title="Terms of Service" href="https://propachill.zendesk.com/hc/th/articles/360004437772" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
                    <p><a title="Privacy Policy" href="https://propachill.zendesk.com/hc/th/articles/360004437792" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
                    <p><a title="Payments Terms of Service" href="https://propachill.zendesk.com/hc/th/articles/360004437812" target="_blank" rel="noopener noreferrer">Payments Terms of Service</a></p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="space-between" align="middle">
              <Col><small>©{new Date().getFullYear()} PropaChill. All Rights Reserved</small></Col>
            </Row>
          </div>
        </Row>
      </footer>
    )
  }
}

export default Footer
