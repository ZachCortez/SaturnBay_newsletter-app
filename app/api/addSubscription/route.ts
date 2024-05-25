// import mailchimp from "@mailchimp/mailchimp_marketing";

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
// });

// export async function POST(request: Request) {
//   const { email } = await request.json();
// // console.log("email", email);
//   if (!email) new Response(JSON.stringify({ error: "Email is required" }));

//   try {
//     const res = await mailchimp.lists.addListMember(
//       process.env.MAILCHIMP_AUDIENCE_ID!,
//       { email_address: email, status: "subscribed" }
//     );

//     return new Response(JSON.stringify({res}));
//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({ error: JSON.parse(error.response.text) })
//     );
//   }
  
// }



import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
  }

  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      { email_address: email, status: "subscribed" }
    );

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.text ? JSON.parse(error.response.text) : { message: error.message };
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500 }
    );
  }
}
