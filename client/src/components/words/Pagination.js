import React from 'react';
import { connect} from 'react-redux';
import { fetchDictPerPage } from '../../actions'

class Pagination extends React.Component {
    
    componentDidUpdate() {
        window.scrollTo(0, 0);
    }
    
    fetchDictPerPage = (page) => {
        // console.log('this.props', this.props)
        this.props.fetchDictPerPage(this.props.currentUserId,page);
    }
    
    render () {
        if(this.props.currentUserId && this.props.total > 0){
            return (
               <div>
                    <nav>
                      <ul className="pagination">
                        <li style={{display: this.props.page === 1 ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(1)} className="page-item text-sm"><button className="page-link" >{'<<'}</button></li>
                        <li style={{display: this.props.page === 1 ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.page-1)} className="page-item text-sm"><button className="page-link" >{'<'}</button></li>
                        <li style={{display: 'block'}} className="page-item active"><button className="page-link">{this.props.page}</button></li>
                        <li style={{display: this.props.pages - this.props.page >= 1  ? 'block' : 'none'}} onClick = {e => this.fetchDictPerPage(this.props.page+1)} className="page-item"><button className="page-link" >{this.props.page+1}</button></li>
                        <li style={{display: this.props.pages - this.props.page >= 2  ? 'block' : 'none'}} onClick = {e => this.fetchDictPerPage(this.props.page+2)} className="page-item"><button className="page-link" >{this.props.page+2}</button></li>
                        <li style={{display: this.props.pages === this.props.page ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.page+1)} className="page-item"><button className="page-link" >Next</button></li>
                        <li style={{display: this.props.pages === this.props.page ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.pages)} className="page-item"><button className="page-link" >{'>>'}</button></li>
                      </ul>
                    </nav>
               </div>
               );
            } else {
                return null
            }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.userId,
        page: state.user.page,
        pages: state.user.pages,
        total: state.user.total
    }
}

export default connect(mapStateToProps,{fetchDictPerPage})(Pagination)