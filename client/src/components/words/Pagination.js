import React from 'react';
import { connect} from 'react-redux';
import { fetchDictPerPage } from '../../actions'

class Pagination extends React.Component {
    
    fetchDictPerPage = (page) => {
        console.log('this.props', this.props)
        this.props.fetchDictPerPage(this.props.currentUserId,page);
    }
    
    render () {
        if(this.props.currentUserId && this.props.total > 0){
            return (
               <div>
                    <nav>
                      <ul class="pagination">
                        <li style={{display: this.props.page === 1 ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(1)}class="page-item text-sm"><a class="page-link" href="#">{'<<'}</a></li>
                        <li style={{display: this.props.page === 1 ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.page-1)} class="page-item text-sm"><a class="page-link" href="#">{'<'}</a></li>
                        <li style={{display: 'block'}} class="page-item active"><a class="page-link" href="#">{this.props.page}</a></li>
                        <li style={{display: this.props.pages - this.props.page >= 1  ? 'block' : 'none'}} onClick = {e => this.fetchDictPerPage(this.props.page+1)} class="page-item"><a class="page-link" href="#">{this.props.page+1}</a></li>
                        <li style={{display: this.props.pages - this.props.page >= 2  ? 'block' : 'none'}} onClick = {e => this.fetchDictPerPage(this.props.page+2)} class="page-item"><a class="page-link" href="#">{this.props.page+2}</a></li>
                        <li style={{display: this.props.pages === this.props.page ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.page+1)} class="page-item"><a class="page-link" href="#">Next</a></li>
                        <li style={{display: this.props.pages === this.props.page ? 'none' : 'block'}} onClick = {e => this.fetchDictPerPage(this.props.pages)} class="page-item"><a class="page-link" href="#">{'>>'}</a></li>
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
    console.log("STATE", state)
    return {
        currentUserId: state.auth.userId,
        page: state.user.page,
        pages: state.user.pages,
        total: state.user.total
    }
}

export default connect(mapStateToProps,{fetchDictPerPage})(Pagination)