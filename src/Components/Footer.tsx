import React from 'react'

export const Footer = () => {
    return (
        <div>
            <footer className="bg-footer-gray text-zinc-400 py-[70px]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                        <div>
                            <h3 className="text-white font-semibold mb-4">Arya Vysya Community</h3>
                            <ul className="text-footer-text-gray">
                                <li className="mb-2"><a href="#" className="hover:underline">Arya Vysya Events</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Arya Vysya Grooms</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Arya Vysya Brides</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">History of Arya Vysya</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Arya Vysya Gothras</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Penugonda</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">VysyaBazaar</h3>
                            <ul className="text-footer-text-gray">
                                <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Jobs</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Press</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Partners</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Vinayagar Decoration</h3>
                            <ul className="text-footer-text-gray">
                                <li className="mb-2"><a href="#" className="hover:underline">2013 | 2014 | 2015</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">2016 | 2017 | 2018</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">2019 | 2020 | 2021</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Help</h3>
                            <ul className="text-footer-text-gray">
                                <li className="mb-2"><a href="#" className="hover:underline">FAQs</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Terms & Conditions</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Feedback</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="text-footer-text-gray">
                                <li className="mb-2 flex items-center"><span className="mr-2">📞</span> Someone@gmail.com</li>
                                <li className="mb-2 flex items-center"><span className="mr-2">📧</span> Someone@gmail.com</li>
                                <li className="mb-2 flex items-center"><span className="mr-2">📧</span> Someone@gmail.com</li>
                            </ul>
                            <h3 className="text-white mb-4">Downloads</h3>
                            <div className="flex space-x-4">
                                <img src="https://placehold.co/100x40" alt="App Store" />
                                <img src="https://placehold.co/100x40" alt="Google Play" />
                            </div>
                        </div>

                    </div>

                    <div className="text-footer-text-gray mt-8 text-center border-t border-footer-line pt-4">
                        <p>Copyright &copy; Vysyamala.com 2024. All rights reserved.</p>
                    </div>

                </div>
            </footer>
        </div>
    )
}
