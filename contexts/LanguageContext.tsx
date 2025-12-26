"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LangCode = 'en' | 'ar' | 'qa';

export interface LanguageContextType {
  lang: LangCode;
  direction: 'ltr' | 'rtl';
  t: (key: string, params?: Record<string, string | number>) => string;
  formatNumber: (num: number) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  toggleLang: (target?: LangCode) => void;
  setLanguage: (lang: LangCode) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Extended translations with categories
const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.programs': 'Programs',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.search': 'Search',
    'nav.search_placeholder': 'Search products...',
    'navbar.searchAria': 'Open search',
    'navbar.searchPlaceholder': 'Search products...',
    'navbar.cartAria': 'View cart',
    'language.label': 'Language',
    'language.switchToEnglish': 'Switch to English',
    'language.switchToQatar': 'Switch to Qatar Language',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.account': 'Account',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.profile': 'My Profile',
    'auth.settings': 'Settings',
    'auth.my_orders': 'My Orders',
    'auth.order_history': 'Order History',
    'auth.addresses': 'My Addresses',
    'auth.payment_methods': 'Payment Methods',
    
    // Common
    'common.welcome': 'Welcome',
    'common.hello': 'Hello, {{name}}!',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    
    // Products
    'products.title': 'Products',
    'products.featured': 'Featured Products',
    'products.new_arrivals': 'New Arrivals',
    'products.bestsellers': 'Bestsellers',
    'products.on_sale': 'On Sale',
    'products.price': 'Price',
    'products.original_price': 'Original Price',
    'products.discount_price': 'Discount Price',
    'products.you_save': 'You Save {{amount}}',
    'products.quantity': 'Quantity',
    'products.in_stock': 'In Stock',
    'products.out_of_stock': 'Out of Stock',
    'products.low_stock': 'Only {{count}} left!',
    'products.add_to_cart': 'Add to Cart',
    'products.buy_now': 'Buy Now',
    'products.add_to_wishlist': 'Add to Wishlist',
    'products.remove_from_wishlist': 'Remove from Wishlist',
    'products.view_details': 'View Details',
    'products.description': 'Description',
    'products.specifications': 'Specifications',
    'products.reviews': 'Reviews',
    'products.related_products': 'Related Products',
    'products.category': 'Category',
    'products.brand': 'Brand',
    'products.sku': 'SKU',
    'products.weight': 'Weight',
    'products.dimensions': 'Dimensions',
    'products.shipping': 'Shipping',
    'products.free_shipping': 'Free Shipping',
    'products.estimated_delivery': 'Estimated Delivery',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.your_cart': 'Your Cart',
    'cart.cart_empty': 'Your cart is empty',
    'cart.item_count': '{{count}} item(s)',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.continue_shopping': 'Continue Shopping',
    'cart.proceed_to_checkout': 'Proceed to Checkout',
    'cart.update_cart': 'Update Cart',
    'cart.clear_cart': 'Clear Cart',
    'cart.coupon_code': 'Coupon Code',
    'cart.apply_coupon': 'Apply Coupon',
    'cart.remove_item': 'Remove',
    'cart.move_to_wishlist': 'Move to Wishlist',
    'cart.quantity': 'Qty',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.billing_address': 'Billing Address',
    'checkout.shipping_address': 'Shipping Address',
    'checkout.same_as_billing': 'Same as billing address',
    'checkout.payment_method': 'Payment Method',
    'checkout.order_summary': 'Order Summary',
    'checkout.place_order': 'Place Order',
    'checkout.secure_checkout': 'Secure Checkout',
    'checkout.credit_card': 'Credit Card',
    'checkout.debit_card': 'Debit Card',
    'checkout.paypal': 'PayPal',
    'checkout.cash_on_delivery': 'Cash on Delivery',
    'checkout.card_number': 'Card Number',
    'checkout.expiry_date': 'Expiry Date',
    'checkout.cvv': 'CVV',
    'checkout.name_on_card': 'Name on Card',
    'checkout.terms_agree': 'I agree to the Terms and Conditions',
    
    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.subscribe': 'Subscribe',
    'footer.subscribe_text': 'Subscribe to get special offers and updates',
    'footer.email_placeholder': 'Your email address',
    'footer.copyright': '© {{year}} Your Company. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.shipping': 'Shipping Policy',
    'footer.returns': 'Returns & Exchanges',
    'footer.faq': 'FAQ',
    'footer.contact_us': 'Contact Us',
    'footer.about_us': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    
    // Forms
    'form.first_name': 'First Name',
    'form.last_name': 'Last Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm Password',
    'form.address': 'Address',
    'form.city': 'City',
    'form.state': 'State/Province',
    'form.zip_code': 'ZIP/Postal Code',
    'form.country': 'Country',
    'form.company': 'Company',
    'form.notes': 'Order Notes',
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.invalid_email': 'Invalid email address',
    'form.password_mismatch': 'Passwords do not match',
    'form.required_field': 'This field is required',
    
    // Messages
    'message.added_to_cart': 'Added to cart successfully!',
    'message.added_to_wishlist': 'Added to wishlist!',
    'message.order_placed': 'Order placed successfully!',
    'message.profile_updated': 'Profile updated successfully!',
    'message.login_success': 'Logged in successfully!',
    'message.logout_success': 'Logged out successfully!',
    'message.register_success': 'Registration successful!',
    'message.coupon_applied': 'Coupon applied successfully!',
    'message.coupon_invalid': 'Invalid coupon code',
    'message.item_removed': 'Item removed from cart',
    
    // Days & Months
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',
    
    'month.january': 'January',
    'month.february': 'February',
    'month.march': 'March',
    'month.april': 'April',
    'month.may': 'May',
    'month.june': 'June',
    'month.july': 'July',
    'month.august': 'August',
    'month.september': 'September',
    'month.october': 'October',
    'month.november': 'November',
    'month.december': 'December',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.categories': 'الفئات',
    'nav.programs': 'البرامج',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.search': 'بحث',
    'nav.search_placeholder': 'ابحث عن المنتجات...',
    'navbar.searchAria': 'افتح البحث',
    'navbar.searchPlaceholder': 'ابحث عن المنتجات...',
    'navbar.cartAria': 'عرض عربة التسوق',
    'language.label': 'اللغة',
    'language.switchToEnglish': 'التبديل إلى الإنجليزية',
    'language.switchToQatar': 'التبديل إلى اللغة القطرية',
    'nav.cart': 'عربة التسوق',
    'nav.wishlist': 'المفضلة',
    'nav.account': 'الحساب',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'تسجيل حساب',
    'auth.logout': 'تسجيل الخروج',
    'auth.profile': 'ملفي',
    'auth.settings': 'الإعدادات',
    'auth.my_orders': 'طلباتي',
    'auth.order_history': 'سجل الطلبات',
    'auth.addresses': 'عناويني',
    'auth.payment_methods': 'طرق الدفع',
    
    // Common
    'common.welcome': 'مرحباً',
    'common.hello': 'مرحباً {{name}}!',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجاح!',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.add': 'إضافة',
    'common.remove': 'إزالة',
    'common.confirm': 'تأكيد',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.continue': 'متابعة',
    'common.finish': 'إنهاء',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.ok': 'موافق',
    
    // Products
    'products.title': 'المنتجات',
    'products.featured': 'منتجات مميزة',
    'products.new_arrivals': 'وصل حديثاً',
    'products.bestsellers': 'الأكثر مبيعاً',
    'products.on_sale': 'في العرض',
    'products.price': 'السعر',
    'products.original_price': 'السعر الأصلي',
    'products.discount_price': 'سعر الخصم',
    'products.you_save': 'وفرت {{amount}}',
    'products.quantity': 'الكمية',
    'products.in_stock': 'متوفر',
    'products.out_of_stock': 'غير متوفر',
    'products.low_stock': 'بقي {{count}} فقط!',
    'products.add_to_cart': 'أضف إلى السلة',
    'products.buy_now': 'اشتر الآن',
    'products.add_to_wishlist': 'أضف إلى المفضلة',
    'products.remove_from_wishlist': 'إزالة من المفضلة',
    'products.view_details': 'عرض التفاصيل',
    'products.description': 'الوصف',
    'products.specifications': 'المواصفات',
    'products.reviews': 'التقييمات',
    'products.related_products': 'منتجات ذات صلة',
    'products.category': 'الفئة',
    'products.brand': 'العلامة التجارية',
    'products.sku': 'الرقم التسلسلي',
    'products.weight': 'الوزن',
    'products.dimensions': 'الأبعاد',
    'products.shipping': 'الشحن',
    'products.free_shipping': 'شحن مجاني',
    'products.estimated_delivery': 'الوقت المتوقع للتوصيل',
    
    // Cart
    'cart.title': 'عربة التسوق',
    'cart.your_cart': 'عربة التسوق الخاصة بك',
    'cart.cart_empty': 'عربة التسوق فارغة',
    'cart.item_count': '{{count}} عنصر',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.tax': 'الضريبة',
    'cart.discount': 'الخصم',
    'cart.total': 'الإجمالي',
    'cart.continue_shopping': 'مواصلة التسوق',
    'cart.proceed_to_checkout': 'اتمام الشراء',
    'cart.update_cart': 'تحديث السلة',
    'cart.clear_cart': 'تفريغ السلة',
    'cart.coupon_code': 'كود الخصم',
    'cart.apply_coupon': 'تطبيق الكوبون',
    'cart.remove_item': 'حذف',
    'cart.move_to_wishlist': 'نقل إلى المفضلة',
    'cart.quantity': 'الكمية',
    
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.billing_address': 'عنوان الفاتورة',
    'checkout.shipping_address': 'عنوان الشحن',
    'checkout.same_as_billing': 'نفس عنوان الفاتورة',
    'checkout.payment_method': 'طريقة الدفع',
    'checkout.order_summary': 'ملخص الطلب',
    'checkout.place_order': 'تأكيد الطلب',
    'checkout.secure_checkout': 'دفع آمن',
    'checkout.credit_card': 'بطاقة ائتمان',
    'checkout.debit_card': 'بطاقة مدى',
    'checkout.paypal': 'باي بال',
    'checkout.cash_on_delivery': 'الدفع عند الاستلام',
    'checkout.card_number': 'رقم البطاقة',
    'checkout.expiry_date': 'تاريخ الانتهاء',
    'checkout.cvv': 'CVV',
    'checkout.name_on_card': 'الاسم على البطاقة',
    'checkout.terms_agree': 'أوافق على الشروط والأحكام',
    
    // Footer
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribe': 'اشتراك',
    'footer.subscribe_text': 'اشترك للحصول على عروض وتحديثات خاصة',
    'footer.email_placeholder': 'عنوان بريدك الإلكتروني',
    'footer.copyright': '© {{year}} شركتك. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.shipping': 'سياسة الشحن',
    'footer.returns': 'الإرجاع والاستبدال',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.contact_us': 'اتصل بنا',
    'footer.about_us': 'من نحن',
    'footer.careers': 'الوظائف',
    'footer.blog': 'المدونة',
    
    // Forms
    'form.first_name': 'الاسم الأول',
    'form.last_name': 'اسم العائلة',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.state': 'المنطقة',
    'form.zip_code': 'الرمز البريدي',
    'form.country': 'البلد',
    'form.company': 'الشركة',
    'form.notes': 'ملاحظات الطلب',
    'form.required': 'مطلوب',
    'form.optional': 'اختياري',
    'form.invalid_email': 'بريد إلكتروني غير صالح',
    'form.password_mismatch': 'كلمات المرور غير متطابقة',
    'form.required_field': 'هذا الحقل مطلوب',
    
    // Messages
    'message.added_to_cart': 'تمت الإضافة إلى السلة بنجاح!',
    'message.added_to_wishlist': 'تمت الإضافة إلى المفضلة!',
    'message.order_placed': 'تم تقديم الطلب بنجاح!',
    'message.profile_updated': 'تم تحديث الملف بنجاح!',
    'message.login_success': 'تم تسجيل الدخول بنجاح!',
    'message.logout_success': 'تم تسجيل الخروج بنجاح!',
    'message.register_success': 'تم التسجيل بنجاح!',
    'message.coupon_applied': 'تم تطبيق الكوبون بنجاح!',
    'message.coupon_invalid': 'كود خصم غير صالح',
    'message.item_removed': 'تم حذف العنصر من السلة',
    
    // Days & Months
    'day.monday': 'الاثنين',
    'day.tuesday': 'الثلاثاء',
    'day.wednesday': 'الأربعاء',
    'day.thursday': 'الخميس',
    'day.friday': 'الجمعة',
    'day.saturday': 'السبت',
    'day.sunday': 'الأحد',
    
    'month.january': 'يناير',
    'month.february': 'فبراير',
    'month.march': 'مارس',
    'month.april': 'أبريل',
    'month.may': 'مايو',
    'month.june': 'يونيو',
    'month.july': 'يوليو',
    'month.august': 'أغسطس',
    'month.september': 'سبتمبر',
    'month.october': 'أكتوبر',
    'month.november': 'نوفمبر',
    'month.december': 'ديسمبر',
  },
  qa: {
    // Qatari Arabic - Mix of Arabic and English
    // Qatari Arabic
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.categories': 'الفئات',
    'nav.programs': 'البرامج',
    'nav.about': 'About Us',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.search': 'Search',
    'nav.search': 'بحث',
    'nav.search_placeholder': 'ابحث عن المنتجات...',
    'navbar.searchAria': 'Open search',
    'navbar.searchAria': 'افتح البحث',
    'navbar.searchPlaceholder': 'ابحث عن المنتجات...',
    'navbar.cartAria': 'View cart',
    'language.label': 'Language',
    'language.switchToEnglish': 'Switch to English',
    'language.switchToQatar': 'Switch to Qatar Language',
    'nav.cart': 'Cart',
    'navbar.cartAria': 'عرض عربة التسوق',
    'language.label': 'اللغة',
    'language.switchToEnglish': 'التبديل إلى الإنجليزية',
    'language.switchToQatar': 'التبديل إلى اللغة القطرية',
    'nav.cart': 'عربة التسوق',
    'nav.wishlist': 'المفضلة',
    'nav.account': 'Account',
    'nav.account': 'الحساب',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'Register',
    'auth.register': 'تسجيل حساب',
    'auth.logout': 'تسجيل الخروج',
    'auth.profile': 'My Profile',
    'auth.settings': 'Settings',
    'auth.profile': 'ملفي',
    'auth.settings': 'الإعدادات',
    'auth.my_orders': 'طلباتي',
    'auth.order_history': 'Order History',
    'auth.order_history': 'سجل الطلبات',
    'auth.addresses': 'عناويني',
    'auth.payment_methods': 'Payment Methods',
    'auth.payment_methods': 'طرق الدفع',
    
    // Common
    'common.welcome': 'Welcome',
    'common.hello': 'Hello, {{name}}!',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.welcome': 'مرحباً',
    'common.hello': 'مرحباً {{name}}!',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجاح!',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'View',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.view': 'عرض',
    'common.add': 'إضافة',
    'common.remove': 'إزالة',
    'common.confirm': 'تأكيد',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.continue': 'متابعة',
    'common.finish': 'إنهاء',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.ok': 'موافق',
    
    // Products
    'products.title': 'Products',
    'products.featured': 'Featured Products',
    'products.new_arrivals': 'New Arrivals',
    'products.title': 'المنتجات',
    'products.featured': 'منتجات مميزة',
    'products.new_arrivals': 'وصل حديثاً',
    'products.bestsellers': 'الأكثر مبيعاً',
    'products.on_sale': 'في العرض',
    'products.price': 'Price',
    'products.original_price': 'Original Price',
    'products.price': 'السعر',
    'products.original_price': 'السعر الأصلي',
    'products.discount_price': 'سعر الخصم',
    'products.you_save': 'You Save {{amount}}',
    'products.quantity': 'Quantity',
    'products.in_stock': 'In Stock',
    'products.out_of_stock': 'Out of Stock',
    'products.low_stock': 'Only {{count}} left!',
    'products.add_to_cart': 'Add to Cart',
    'products.you_save': 'وفرت {{amount}}',
    'products.quantity': 'الكمية',
    'products.in_stock': 'متوفر',
    'products.out_of_stock': 'غير متوفر',
    'products.low_stock': 'بقي {{count}} فقط!',
    'products.add_to_cart': 'أضف إلى السلة',
    'products.buy_now': 'اشتر الآن',
    'products.add_to_wishlist': 'Add to Wishlist',
    'products.remove_from_wishlist': 'Remove from Wishlist',
    'products.view_details': 'View Details',
    'products.description': 'Description',
    'products.specifications': 'Specifications',
    'products.reviews': 'Reviews',
    'products.related_products': 'Related Products',
    'products.category': 'Category',
    'products.brand': 'Brand',
    'products.sku': 'SKU',
    'products.weight': 'Weight',
    'products.dimensions': 'Dimensions',
    'products.shipping': 'Shipping',
    'products.free_shipping': 'Free Shipping',
    'products.estimated_delivery': 'Estimated Delivery',
    'products.add_to_wishlist': 'أضف إلى المفضلة',
    'products.remove_from_wishlist': 'إزالة من المفضلة',
    'products.view_details': 'عرض التفاصيل',
    'products.description': 'الوصف',
    'products.specifications': 'المواصفات',
    'products.reviews': 'التقييمات',
    'products.related_products': 'منتجات ذات صلة',
    'products.category': 'الفئة',
    'products.brand': 'العلامة التجارية',
    'products.sku': 'الرقم التسلسلي',
    'products.weight': 'الوزن',
    'products.dimensions': 'الأبعاد',
    'products.shipping': 'الشحن',
    'products.free_shipping': 'شحن مجاني',
    'products.estimated_delivery': 'الوقت المتوقع للتوصيل',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.your_cart': 'Your Cart',
    'cart.cart_empty': 'Your cart is empty',
    'cart.item_count': '{{count}} item(s)',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.continue_shopping': 'Continue Shopping',
    'cart.proceed_to_checkout': 'Proceed to Checkout',
    'cart.update_cart': 'Update Cart',
    'cart.clear_cart': 'Clear Cart',
    'cart.coupon_code': 'Coupon Code',
    'cart.apply_coupon': 'Apply Coupon',
    'cart.remove_item': 'Remove',
    'cart.move_to_wishlist': 'Move to Wishlist',
    'cart.quantity': 'Qty',
    'cart.title': 'عربة التسوق',
    'cart.your_cart': 'عربة التسوق الخاصة بك',
    'cart.cart_empty': 'عربة التسوق فارغة',
    'cart.item_count': '{{count}} عنصر',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.tax': 'الضريبة',
    'cart.discount': 'الخصم',
    'cart.total': 'الإجمالي',
    'cart.continue_shopping': 'مواصلة التسوق',
    'cart.proceed_to_checkout': 'اتمام الشراء',
    'cart.update_cart': 'تحديث السلة',
    'cart.clear_cart': 'تفريغ السلة',
    'cart.coupon_code': 'كود الخصم',
    'cart.apply_coupon': 'تطبيق الكوبون',
    'cart.remove_item': 'حذف',
    'cart.move_to_wishlist': 'نقل إلى المفضلة',
    'cart.quantity': 'الكمية',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.billing_address': 'Billing Address',
    'checkout.shipping_address': 'Shipping Address',
    'checkout.same_as_billing': 'Same as billing address',
    'checkout.payment_method': 'Payment Method',
    'checkout.order_summary': 'Order Summary',
    'checkout.place_order': 'Place Order',
    'checkout.secure_checkout': 'Secure Checkout',
    'checkout.credit_card': 'Credit Card',
    'checkout.debit_card': 'Debit Card',
    'checkout.paypal': 'PayPal',
    'checkout.cash_on_delivery': 'Cash on Delivery',
    'checkout.card_number': 'Card Number',
    'checkout.expiry_date': 'Expiry Date',
    'checkout.title': 'الدفع',
    'checkout.billing_address': 'عنوان الفاتورة',
    'checkout.shipping_address': 'عنوان الشحن',
    'checkout.same_as_billing': 'نفس عنوان الفاتورة',
    'checkout.payment_method': 'طريقة الدفع',
    'checkout.order_summary': 'ملخص الطلب',
    'checkout.place_order': 'تأكيد الطلب',
    'checkout.secure_checkout': 'دفع آمن',
    'checkout.credit_card': 'بطاقة ائتمان',
    'checkout.debit_card': 'بطاقة مدى',
    'checkout.paypal': 'باي بال',
    'checkout.cash_on_delivery': 'الدفع عند الاستلام',
    'checkout.card_number': 'رقم البطاقة',
    'checkout.expiry_date': 'تاريخ الانتهاء',
    'checkout.cvv': 'CVV',
    'checkout.name_on_card': 'Name on Card',
    'checkout.terms_agree': 'I agree to the Terms and Conditions',
    'checkout.name_on_card': 'الاسم على البطاقة',
    'checkout.terms_agree': 'أوافق على الشروط والأحكام',
    
    // Footer
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribe': 'Subscribe',
    'footer.subscribe_text': 'Subscribe to get special offers and updates',
    'footer.email_placeholder': 'Your email address',
    'footer.copyright': '© {{year}} Your Company. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.shipping': 'Shipping Policy',
    'footer.returns': 'Returns & Exchanges',
    'footer.faq': 'FAQ',
    'footer.contact_us': 'Contact Us',
    'footer.about_us': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.subscribe': 'اشتراك',
    'footer.subscribe_text': 'اشترك للحصول على عروض وتحديثات خاصة',
    'footer.email_placeholder': 'عنوان بريدك الإلكتروني',
    'footer.copyright': '© {{year}} شركتك. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.shipping': 'سياسة الشحن',
    'footer.returns': 'الإرجاع والاستبدال',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.contact_us': 'اتصل بنا',
    'footer.about_us': 'من نحن',
    'footer.careers': 'الوظائف',
    'footer.blog': 'المدونة',
    
    // Forms
    'form.first_name': 'First Name',
    'form.last_name': 'Last Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm Password',
    'form.address': 'Address',
    'form.city': 'City',
    'form.state': 'State/Province',
    'form.zip_code': 'ZIP/Postal Code',
    'form.country': 'Country',
    'form.company': 'Company',
    'form.notes': 'Order Notes',
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.invalid_email': 'Invalid email address',
    'form.password_mismatch': 'Passwords do not match',
    'form.required_field': 'This field is required',
    'form.first_name': 'الاسم الأول',
    'form.last_name': 'اسم العائلة',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.state': 'المنطقة',
    'form.zip_code': 'الرمز البريدي',
    'form.country': 'البلد',
    'form.company': 'الشركة',
    'form.notes': 'ملاحظات الطلب',
    'form.required': 'مطلوب',
    'form.optional': 'اختياري',
    'form.invalid_email': 'بريد إلكتروني غير صالح',
    'form.password_mismatch': 'كلمات المرور غير متطابقة',
    'form.required_field': 'هذا الحقل مطلوب',
    
    // Messages
    'message.added_to_cart': 'Added to cart successfully!',
    'message.added_to_wishlist': 'Added to wishlist!',
    'message.order_placed': 'Order placed successfully!',
    'message.profile_updated': 'Profile updated successfully!',
    'message.login_success': 'Logged in successfully!',
    'message.logout_success': 'Logged out successfully!',
    'message.register_success': 'Registration successful!',
    'message.coupon_applied': 'Coupon applied successfully!',
    'message.coupon_invalid': 'Invalid coupon code',
    'message.item_removed': 'Item removed from cart',
    'message.added_to_cart': 'تمت الإضافة إلى السلة بنجاح!',
    'message.added_to_wishlist': 'تمت الإضافة إلى المفضلة!',
    'message.order_placed': 'تم تقديم الطلب بنجاح!',
    'message.profile_updated': 'تم تحديث الملف بنجاح!',
    'message.login_success': 'تم تسجيل الدخول بنجاح!',
    'message.logout_success': 'تم تسجيل الخروج بنجاح!',
    'message.register_success': 'تم التسجيل بنجاح!',
    'message.coupon_applied': 'تم تطبيق الكوبون بنجاح!',
    'message.coupon_invalid': 'كود خصم غير صالح',
    'message.item_removed': 'تم حذف العنصر من السلة',
    
    // Days & Months - Keep in English for QA
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',
    // Days & Months
    'day.monday': 'الاثنين',
    'day.tuesday': 'الثلاثاء',
    'day.wednesday': 'الأربعاء',
    'day.thursday': 'الخميس',
    'day.friday': 'الجمعة',
    'day.saturday': 'السبت',
    'day.sunday': 'الأحد',
    
    'month.january': 'January',
    'month.february': 'February',
    'month.march': 'March',
    'month.april': 'April',
    'month.may': 'May',
    'month.june': 'June',
    'month.july': 'July',
    'month.august': 'August',
    'month.september': 'September',
    'month.october': 'October',
    'month.november': 'November',
    'month.december': 'December',
    'month.january': 'يناير',
    'month.february': 'فبراير',
    'month.march': 'مارس',
    'month.april': 'أبريل',
    'month.may': 'مايو',
    'month.june': 'يونيو',
    'month.july': 'يوليو',
    'month.august': 'أغسطس',
    'month.september': 'سبتمبر',
    'month.october': 'أكتوبر',
    'month.november': 'نوفمبر',
    'month.december': 'ديسمبر',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangCode>('en');
  const direction = lang === 'en' ? 'ltr' : 'rtl';
  const isRTL = direction === 'rtl';

  // Translation function with fallback
  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = (TRANSLATIONS[lang] as Record<string, string>)[key] || (TRANSLATIONS.en as Record<string, string>)[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, String(value));
      });
    }
    
    return translation;
  };

  // Format numbers based on locale
  const formatNumber = (num: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'ar-QA';
    return new Intl.NumberFormat(locale).format(num);
  };

  // Format dates based on locale
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const locale = lang === 'en' ? 'en-US' : 'ar-QA';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }).format(dateObj);
  };

  // Format currency based on locale
  const formatCurrency = (amount: number, currency: string = 'QAR'): string => {
    const locale = lang === 'en' ? 'en-US' : 'ar-QA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const setLanguage = (newLang: LangCode) => {
    setLang(newLang);
    localStorage.setItem('appLanguage', newLang);
    
    // Dispatch event for other parts of the app
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
  };

  const toggleLang = (target?: LangCode) => {
    if (target) {
      setLanguage(target);
      return;
    }
    
    const order: LangCode[] = ['en', 'ar', 'qa'];
    const currentIndex = order.indexOf(lang);
    const nextIndex = (currentIndex + 1) % order.length;
    setLanguage(order[nextIndex]);
  };

  useEffect(() => {
    // Initialize from localStorage
    const storedLang = localStorage.getItem('appLanguage') as LangCode;
    if (storedLang && ['en', 'ar', 'qa'].includes(storedLang)) {
      setLang(storedLang);
    }

    // Apply language-specific HTML attributes
    document.documentElement.lang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.dir = direction;
    document.documentElement.classList.toggle('rtl', isRTL);
    document.documentElement.classList.toggle('ltr', !isRTL);
    document.body.setAttribute('data-lang', lang);
    
    // Add language-specific font
    if (lang === 'ar' || lang === 'qa') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang, direction, isRTL]);

  const value: LanguageContextType = {
    lang,
    direction,
    t,
    formatNumber,
    formatDate,
    formatCurrency,
    toggleLang,
    setLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};