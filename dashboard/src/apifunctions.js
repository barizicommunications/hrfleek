    // getClients({commit}){
    //   axios
    //   .get(
    //     `http://localhost:5001/scanpal-f74da/us-central1/barizi/clients/get/all`
    //   )
    //   .then((res) => {
    //     const clients = res.data.partners;
    //     commit("setClients", clients);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // },
  //  async addClients({dispatch},data){
  //     const ref = fb.storage.ref();
  //     console.log(data.logo)
  //     const url = await ref
  //       .child(data.logo.file.name)
  //       .put(data.logo.file.originFileObj, data.logo.file.type)
  //       .then((snapshot) => snapshot.ref.getDownloadURL());
  //       const payload ={
  //         company_name: data.company_name,
  //         company_email: data.company_email,
  //         company_phone: data.prefix+data.company_phone,
  //         address: data.company_address,
  //         logo:url
  //       }
   
  //     axios
  //     .post(
  //      ' http://localhost:5001/scanpal-f74da/us-central1/barizi/clients/create',payload
  //     )
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((e) => {
  //       alert(e.message);
  //     });
  //   },
    // async addEmployees({dispatch},data){
    //     const payload ={
    //       email: data.email,
    //       phone_number: data.phone_number,
    //       bank_name:data.bank_name,
    //       account_number:data.account_number,
    //       accountName:data.account_name,
    //       bank_branch:data.branch_name,       
    //       full_name:data.first_name +data.last_name,
    //       department:data.department,
    //       designation:data.designation,
    //       pay_rate:0,
    //       hours_worked:0,
    //       basic_pay:data.basic_pay,
    //       deductions:data.deductions,
    //       net_pay:0
    //     }
   
    //   axios
    //   .post(
    //    'http://localhost:5001/scanpal-f74da/us-central1/barizi/people/create/AUmX9nnuzvPDrmigwvjz',payload
    //   )
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((e) => {
    //     alert(e.message);
    //   });
    // },
    // getEmployees({commit}){
    //   axios
    //   .get(
    //     `http://localhost:5001/scanpal-f74da/us-central1/barizi/people/get/AUmX9nnuzvPDrmigwvjz
    //     `
    //   )
    //   .then((res) => {
    //     const employees = res.data.people;
    //     commit("setEmployees", employees);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // },