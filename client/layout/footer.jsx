import className from  '../assets/style/footer.styl'

export default {
    data(){
        return{
            author: 'Jasonccj'
        }
    },
    render(){
        return (
            <div id={className.footer}>
                <span>Written by {this.author}</span>
            </div>
        )
    }
}
// export default Footer