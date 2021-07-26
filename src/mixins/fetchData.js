export default function(fachDataValue = null){
    return {
        data(){
            return {
                data:fachDataValue,
                loading:true,
            }
        },
        async created(){
            this.data = await this.fetchData();
            this.loading = false;
        }
    }
}