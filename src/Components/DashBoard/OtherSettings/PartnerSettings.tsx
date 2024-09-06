// export const PartnerSettings = () => {
//   return (
//     <div>
//       <div>
//         <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Partner Settings</h2>

//         <div>
//           <div className="">

//             <div className="flex justify-between items-center mb-5">
//               {/* Age */}
//               <div className="flex justify-center items-center space-x-5">
//                 <div>
//                   <label htmlFor="fromAge" className="text-[20px] text-primary font-semibold">Age</label> <br />
//                   <input type="text"
//                     name="fromAge"
//                     id="fromAge"
//                     placeholder="From"
//                     className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
//                 </div>

//                 <div>
//                   <label htmlFor="toAge" className="text-[20px] text-primary font-semibold invisible">Age</label> <br />
//                   <input type="text"
//                     name="toAge"
//                     id="toAge"
//                     placeholder="To"
//                     className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
//                 </div>
//               </div>

//               {/* Height */}
//               <div className="flex justify-center items-center space-x-5">
//                 <div>
//                   <label htmlFor="fromHeight" className="text-[20px] text-primary font-semibold ">Height</label> <br />
//                   <input type="text"
//                     name="fromHeight"
//                     id="fromHeight"
//                     placeholder="From"
//                     className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
//                 </div>

//                 <div>
//                   <label htmlFor="toHeight" className="text-[20px] text-primary font-semibold invisible">Height</label> <br />
//                   <input type="text"
//                     name="toHeight"
//                     id="toHeight"
//                     placeholder="To"
//                     className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
//                 </div>
//               </div>

//             </div>

//             <div>
//               {/* Education */}
//               <div className="mb-5">
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Education</h4>

//                 <div className="w-8/12 flex justify-between items-start">
//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="bachelors" id="bachelors" className="mr-2" />
//                       <label htmlFor="bachelors" className="text-[20px] text-ash">Bachelors - Arts/Science/Commerce/B.Phil</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="rup" id="rup" className="mr-2" />
//                       <label htmlFor="rup" className="text-[20px] text-ash">Recently Updated Profiles</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="oe" id="oe" className="mr-2" />
//                       <label htmlFor="oe" className="text-[20px] text-ash">Offers and Events</label>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="pva" id="pva" className="mr-2" />
//                       <label htmlFor="pva" className="text-[20px] text-ash">Profile Visitor Alert</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="eia" id="eia" className="mr-2" />
//                       <label htmlFor="eia" className="text-[20px] text-ash">Express Interest Alert</label>
//                     </div>
//                   </div>
//                 </div>

//               </div>

//               {/* Profession */}
//               <div className="mb-5">
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Profession</h4>

//                 <div className="w-8/12 flex justify-between items-start">
//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="pmpa" id="pmpa" className="mr-2" />
//                       <label htmlFor="pmpa" className="text-[20px] text-ash">Matching Profile Alert</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="prup" id="prup" className="mr-2" />
//                       <label htmlFor="prup" className="text-[20px] text-ash">Recently Updated Profiles</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="poe" id="poe" className="mr-2" />
//                       <label htmlFor="poe" className="text-[20px] text-ash">Offers and Events</label>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="ppva" id="ppva" className="mr-2" />
//                       <label htmlFor="ppva" className="text-[20px] text-ash">Profile Visitor Alert</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="peia" id="peia" className="mr-2" />
//                       <label htmlFor="peia" className="text-[20px] text-ash">Express Interest Alert</label>
//                     </div>
//                   </div>
//                 </div>

//               </div>

//               {/* Annual Income */}
//               <div className="mb-5">
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Annual Income</h4>

//                 <div className="w-8/12 flex justify-between items-start">
//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="ani" id="ani" className="mr-2" />
//                       <label htmlFor="ani" className="text-[20px] text-ash">No Income</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="a50k" id="a50k" className="mr-2" />
//                       <label htmlFor="a50k" className="text-[20px] text-ash">Rs.50,000 - 1,00,000</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="a3l" id="a3l" className="mr-2" />
//                       <label htmlFor="a3l" className="text-[20px] text-ash">Rs.3,00,000 - 4,00,000</label>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="mb-2">
//                       <input type="checkbox" name="au50k" id="au50k" className="mr-2" />
//                       <label htmlFor="au50k" className="text-[20px] text-ash">Under Rs.50,000</label>
//                     </div>

//                     <div className="mb-2">
//                       <input type="checkbox" name="a1l" id="a1l" className="mr-2" />
//                       <label htmlFor="a1l" className="text-[20px] text-ash">Rs.1,00,001 - 2,00,000</label>
//                     </div>
//                   </div>
//                 </div>

//               </div>

//               {/* Rahu/Ketu Dhosam */}
//               <div>
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Rahu/Ketu Dhosam</h4>

//                 <div className="w-1/6 flex justify-between items-center mb-5">
//                   <div>
//                     <input type="radio" name="radio" id="ryes" className="mr-2" />
//                     <label htmlFor="ryes" className="text-[20px] text-ash">Yes</label>
//                   </div>

//                   <div>
//                     <input type="radio" name="radio" id="rno" className="mr-2" />
//                     <label htmlFor="rno" className="text-[20px] text-ash">No</label>
//                   </div>
//                 </div>
//               </div>

//               {/* Chevvai Dhosam */}
//               <div>
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Chevvai Dhosam</h4>

//                 <div className="w-1/6 flex justify-between items-center mb-5">
//                   <div>
//                     <input type="radio" name="cradio" id="cyes" className="mr-2" />
//                     <label htmlFor="cyes" className="text-[20px] text-ash">Yes</label>
//                   </div>

//                   <div>
//                     <input type="radio" name="cradio" id="cno" className="mr-2" />
//                     <label htmlFor="cno" className="text-[20px] text-ash">No</label>
//                   </div>
//                 </div>
//               </div>

//               {/* Foreign Interest */}
//               <div>
//                 <h4 className="text-[20px] text-primary font-semibold mb-2">Foreign Interest</h4>

//                 <div className="w-2/6 flex justify-between items-center mb-5">
//                   <div>
//                     <input type="radio" name="fradio" id="fyes" className="mr-2" />
//                     <label htmlFor="fyes" className="text-[20px] text-ash">Yes</label>
//                   </div>

//                   <div>
//                     <input type="radio" name="fradio" id="fno" className="mr-2" />
//                     <label htmlFor="fno" className="text-[20px] text-ash">No</label>
//                   </div>

//                   <div>
//                     <input type="radio" name="fradio" id="fboth" className="mr-2" />
//                     <label htmlFor="fboth" className="text-[20px] text-ash">Both</label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end items-center space-x-5">
//               <button className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer">
//                 Cancel
//               </button>
//               <button className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer">
//                 Update Changes </button>

//             </div>





//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NotifyError, NotifySuccess, ToastNotification } from '../../Toast/ToastNotification';

// Define Zod schema for validation
const schema = z.object({
  fromAge: z
  .string()
  .optional()
  .refine(value => !value || /^\d+$/.test(value), {
    message: "Must be a number",
  }),

  fromHeight: z
    .string()
    .nonempty("Height From is required")
    .refine(value => /^\d+$/.test(value), {
      message: "Height From must be a number",
    }),
    toHeight: z
    .string()
    .nonempty("Height To is required")
    .refine(value => /^\d+$/.test(value), {
      message: "Height To must be a number",
    }),

  // education: z.array(z.string()).nonempty('Please select at least one education option.'),
  education: z
    .array(z.string())
    .nonempty('Please select at least one education option.')
    .refine((val) => val.length > 0, {
      message: 'The education field is required.',
    }),
  profession: z.array(z.string()).nonempty('Please select at least one profession option.'),
  income: z.array(z.string()).nonempty('Please select at least one income option.'),
  rahuKetuDhosam: z.string().nonempty('Please select Rahu/Ketu Dhosam option.'),
  chevvaiDhosam: z.string().nonempty('Please select Chevvai Dhosam option.'),
  foreignInterest: z.string().nonempty('Please select Foreign Interest option.'),
});

// Define types for form data and options
type PartnerSettingsForm = z.infer<typeof schema>;

interface Option {
  id: string;
  name: string;
}

export const PartnerSettings: React.FC = () => {
  const [educationOptions, setEducationOptions] = useState<Option[]>([]);
  const [professionOptions, setProfessionOptions] = useState<Option[]>([]);
  const [incomeOptions, setIncomeOptions] = useState<Option[]>([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PartnerSettingsForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    axios.post('http://103.214.132.20:8000/auth/Get_Highest_Education/')
      .then(response => {
        const data = Object.values(response.data).map((item: any) => ({
          id: item.education_id,
          name: item.education_description,
        }));
        setEducationOptions(data);
      })
      .catch(error => console.error('Error fetching education data:', error));
  }, []);

  useEffect(() => {
    axios.post('http://103.214.132.20:8000/auth/Get_profession/')
      .then(response => {
        const data = Object.values(response.data).map((item: any) => ({
          id: item.profession_id,
          name: item.profession_name,
        }));
        setProfessionOptions(data);
      })
      .catch(error => console.error('Error fetching profession data:', error));
  }, []);

  useEffect(() => {
    axios.post('http://103.214.132.20:8000/auth/Get_Annual_Income/')
      .then(response => {
        const data = Object.values(response.data).map((item: any) => ({
          id: item.income_id,
          name: item.income_description,
        }));
        console.log('Get_Annual_Income',data)
        setIncomeOptions(data);
      })
      .catch(error => console.error('Error fetching income data:', error));
  }, []);

 
  useEffect(() => {
    const profile_id = sessionStorage.getItem('loginuser_profile_id'); // Replace with dynamic profile ID if needed
    axios.post('http://103.214.132.20:8000/auth/Get_myprofile_partner/', { profile_id })
      .then(response => {
        const data = response.data.data;
        console.log("Get_myprofile_partner", data);
        
        // Map the selected values for education, profession, and income
        const selectedEducation = data.partner_edu_id.split(',').map((id: string) => id.trim());
        const selectedProfession = data.partner_profe.split(',').map((id: string) => id.trim());
        const selectedIncome = data.partner_ann_inc.split(',').map((id: string) => id.trim());

        setValue('fromAge', data.partner_age || '');
        setValue('fromHeight', data.partner_height_from || '');
        setValue('toHeight', data.partner_height_to || '');
        setValue('education', selectedEducation);
        setValue('income', selectedIncome);
        setValue('profession', selectedProfession);
        setValue('rahuKetuDhosam', data.partner_rahu_kethu || '');
        setValue('chevvaiDhosam', data.partner_chev_dho || '');
        setValue('foreignInterest', data.partner_fgn_Int || '');
      })
      .catch(error => console.error('Error fetching partner profile:', error));
  }, [setValue]);

 
  const onSubmit = (data: PartnerSettingsForm) => {
    const updateData = {
        profile_id: sessionStorage.getItem('loginuser_profile_id'),
        pref_age_differences: `${data.fromAge}`,
        pref_height_from: data.fromHeight,
        pref_height_to: data.toHeight,
        pref_profession: data.profession.join(','),
        pref_education: data.education.join(','),
        pref_anual_income: data.income.join(','),
        pref_chevvai: data.chevvaiDhosam,
        pref_ragukethu: data.rahuKetuDhosam,
        pref_foreign_intrest: data.foreignInterest,
    };

    axios.post('http://103.214.132.20:8000/auth/Update_myprofile_partner/', updateData)
        .then(response => {
            console.log('Partner preferences updated:', response.data);
            if (response.data.status === "success") {
             NotifySuccess('Partner Settings updated successfully');
            } else {
              NotifyError('Failed to update notification settings');
            }
            if (response.data.Status === "success") {
                NotifySuccess("Family details saved successfully");
            } 
        })
        .catch(error => console.error('Error updating partner preferences:', error));
};

  return (
    <div>
      <ToastNotification/>
      <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Partner Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Age */}
        <div className="flex justify-between items-center mb-5">
         
<div className="flex justify-center items-center space-x-5">
  <div>
    <label htmlFor="fromAge" className="text-[20px] text-primary font-semibold">Age</label> <br />
    <select
      id="fromAge"
      {...register('fromAge')}
      className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
    >
      <option value="" disabled>Select Age</option>
      {[...Array(10)].map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
    {errors.fromAge && <span className="text-red-500">{errors.fromAge.message}</span>}
  </div>
</div>

          {/* Height */}
          <div className="flex justify-center items-center space-x-5">
            <div>
              <label htmlFor="fromHeight" className="text-[20px] text-primary font-semibold">Height</label> <br />
              <input
                type="text"
                id="fromHeight"
                placeholder="From"
                {...register('fromHeight')}
                className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
              />
              {errors.fromHeight && <span  className="text-red-500 block mt-0">{errors.fromHeight.message}</span>}
            </div>

            <div>
              <label htmlFor="toHeight" className="text-[20px] text-primary font-semibold invisible">Height</label> <br />
              <input
                type="text"
                id="toHeight"
                placeholder="To"
                {...register('toHeight')}
                className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
              />
              {errors.toHeight && <span  className="text-red-500 block mt-0">{errors.toHeight.message}</span>}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Education</h4>
          <div className="w-full flex flex-wrap gap-4">
            {educationOptions.map((option) => (
              <div className="flex items-center mb-2 w-[calc(50%-0.5rem)]" key={option.id}>
                <input
                  type="checkbox"
                  id={`education-${option.id}`}
                  value={option.id}
                  {...register('education')}
                  className="mr-2"
                />
                <label htmlFor={`education-${option.id}`} className="text-[20px] text-ash">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.education?.message && typeof errors.education.message === 'string' && (
            <span className="text-red-500">{errors.education.message}</span>
          )}
        </div>

        {/* Profession */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Profession</h4>
          <div className="w-full flex flex-wrap gap-4">
            {professionOptions.map((option) => (
              <div className="flex items-center mb-2 w-[calc(50%-0.5rem)]" key={option.id}>
                <input
                  type="checkbox"
                  id={`profession-${option.id}`}
                  value={option.id}
                  {...register('profession')}
                  className="mr-2"
                />
                <label htmlFor={`profession-${option.id}`} className="text-[20px] text-ash">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.profession?.message && typeof errors.profession.message === 'string' && (
            <span className="text-red-500">{errors.profession.message}</span>
          )}
        </div>

        {/* Income */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Annual Income</h4>
          <div className="w-full flex flex-wrap gap-4">
            {incomeOptions.map((option) => (
              <div className="flex items-center mb-2 w-[calc(50%-0.5rem)]" key={option.id}>
                <input
                  type="checkbox"
                  id={`income-${option.id}`}
                  value={option.id}
                  {...register('income')}
                  className="mr-2"
                />
                <label htmlFor={`income-${option.id}`} className="text-[20px] text-ash">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.income?.message && typeof errors.income.message === 'string' && (
            <span className="text-red-500">{errors.income.message}</span>
          )}
        </div>

        {/* Rahu/Ketu Dhosam */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Rahu/Ketu Dhosam</h4>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="Yes"
                {...register('rahuKetuDhosam')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="No"
                {...register('rahuKetuDhosam')}
                className="mr-2"
              />
              No
            </label>
            {errors.rahuKetuDhosam && <span className="text-red-500">{errors.rahuKetuDhosam.message}</span>}
          </div>
        </div>

        {/* Chevvai Dhosam */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Chevvai Dhosam</h4>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="Yes"
                {...register('chevvaiDhosam')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="No"
                {...register('chevvaiDhosam')}
                className="mr-2"
              />
              No
            </label>
            {errors.chevvaiDhosam && <span className="text-red-500">{errors.chevvaiDhosam.message}</span>}
          </div>
        </div>

        {/* Foreign Interest */}

        {/* <div>
                   <input type="radio" name="fradio" id="fyes" className="mr-2" />
                    <label htmlFor="fyes" className="text-[20px] text-ash">Yes</label>
                  </div> */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2">Foreign Interest</h4>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="Yes"
                {...register('foreignInterest')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center mr-4 ">
              <input
                type="radio"
                value="No"
                {...register('foreignInterest')}
                className="mr-2 "
              />
              No
            </label>
            <label className="inline-flex items-center ">
              <input
                type="radio"
                value="Both"
                {...register('foreignInterest')}
                className="mr-2 "
              />
              Both
            </label>
            {errors.foreignInterest && <span className="text-red-500">{errors.foreignInterest.message}</span>}
          </div>
        </div>
        <div className="flex justify-end items-center space-x-5">
        <button 
        type="submit"
        className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer">
         Update Changes
        </button>
        </div>
      </form>
      <ToastNotification />
    </div>
  );
};

