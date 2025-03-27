import { useState } from 'react';

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: 'What is staking?',
        answer: 'Staking involves locking up your tokens in a wallet or contract to earn rewards over time.'
    },
    {
        question: 'Is there a lock period?',
        answer: 'There is a 7 day lock period, which starts when you add WMTx to the staking contract. It applies to your entire staked WMTx balance. During this time, you’ll earn WMTx as normal.'
    },
    {
        question: 'What can I use my WMTx for?',
        answer: 'You can use your WMTx to participate in staking, governance, or trading within the ecosystem.'
    },
    {
        question: 'How do I earn WMTx by staking WMTx, and what is the maximum I can earn?',
        answer: 'By staking your WMTx, you earn additional WMTx based on the staking contract’s rewards rate. The maximum you can earn depends on the staking terms.'
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='w-full relative z-[10] md:rounded-b-[60px] bg-primary-bg rounded-b-[30px]'>
            <div className="2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4 py-16 rounded-b-[60px] text-primary w-full bg-primary-bg flex flex-col md:flex-row gap-10 md:gap-5">
                {/* <h1 className="text-5xl mb-6 text-center">FAQs</h1> */}
                <div className='md:w-[40%] lg:text-[40px] text-[32px] font-bold'>
                    <div>Got a question?</div>
                    <div>We’ve got the answer</div>
                </div>
                <div className="space-y-4 md:w-[60%]">
                    {faqData.map((faq, index) => (
                        <div key={index} className="px-8 py-2 rounded-2xl border border-[#525252]">
                            <div
                                className="flex justify-between items-center py-2 cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                            >
                                <h3 className="text-xl text-primary font-medium">{faq.question}</h3>
                                <span className="text-[35px]">{openIndex === index ? '×' : '+'}</span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="py-2 text-light">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
