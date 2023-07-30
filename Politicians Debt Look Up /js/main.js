
document.querySelector('button').addEventListener('click', getID);

async function getID() {
  //user will enter handle name 
  const choice = document.querySelector('input').value;
    //Run endpoint 
    const endpoint1 = fetch(`https://api.open.fec.gov/v1/schedules/schedule_c/?per_page=20&sort_nulls_last=true&committee_name=${choice}&sort_hide_null=false&sort_null_only=false&sort=-incurred_date&api_key=OFrrSvXdhKnYjRvjeGDA1FXegzlWxU3zkO32R3d8&q` ,  {
    });
  
    try {
      const response1 = await endpoint1;
      const returnResponse1 = await response1.json();

      const results = returnResponse1.results;
      let totalLoanBalnce = 0;
      let loanSourceNames = [];

      for (let i=0; i < results.length; i++) {
        const loanBalance = results[i].loan_balance;
        const loanSourceFirstName = results[i].loan_source_first_name;
        const loanSourceLastName = results[i].loan_source_last_name;

        totalLoanBalnce += loanBalance;
        loanSourceNames.push(`${loanSourceFirstName} ${loanSourceLastName}`); 
      }
      document.querySelector('h2').innerText =  `Total Loan Balance: $${totalLoanBalnce.toLocaleString()}`; 
      document.querySelector('h3').innerText = `Money Owed To: ${loanSourceNames.join(", ")}`; 

  } catch (error) {
    console.error(error);
  }
}
