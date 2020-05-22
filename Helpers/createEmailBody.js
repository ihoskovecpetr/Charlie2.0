
module.exports = ({QRCode ,
    message,
    event_name, 
    event_address, 
    event_dateStart, 
    event_description,
    guest_name }) => {

return `
<div>
<br>
<h5>EVENT</h5>
<h3 style="font-weight:600">${event_name}</h3>
<h5 >GUEST<br><span style="font-weight:600, padding-bottom: 10px">${guest_name}<span></h5>
<br>
<img src="${QRCode}" alt="ALternative to IMG" style={{height: 100px, width: 100px}}>
<p>------------------</p>
<h5>MESSAGE <br>${message}</h5>
<h5>ADDRESS <br>${event_address}</h5>
<h5>TIME <br><b>${event_dateStart}</b></h5>
<h5>DESCRIPTION <br><b>${event_description}</b></h5>
</div> 
`
};