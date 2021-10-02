import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// tips: export each translation to a seperate file
const resources = {
  en: {
    translation: {
      english: 'English',
      welcome: 'Will you enroll Academy Of Cryptography Techniques ?',
      inevitable: 'OF COURSE, KMA IS MY CHOICE',
      mayBe: 'I AM CONSIDERING',
      noChoose: 'NO, I HAVE A PLAN',
      settings: 'Settings',
      home: 'Home',
      language: 'Language',
      cntt: 'INFORMATION TECHNOLOGY',
      attt: 'INFORMATION SECURITY',
      dtvt: 'ELECTRONICS AND TELECOMMUNICATIONS ENGINEERING',
      industry: 'The industry you are interested in ?',
      continue: 'CONTINUE',
      thanks: 'THANK YOU !',
      takeGift: 'The Academy gives you a gift',
      descriptionCntt:
        'Designing, developing and programming embedded software on mobile devices (smartphone, tablet, iphone, ipad ...); microprocessor controller, microcontroller, home appliance; build embedded solutions to automate operations. ',
      descriptionAttt:
        'Design, develop, operate and ensure safety for IT - Communication - Telecommunication network systems, database systems and network infrastructure, develop safety policies, test, and secure pricing for information systems; number investigation and troubleshooting; defense and protection of national digital space sovereignty. ',
      descriptionDtvt:
        'Designing, developing, programming and operating automatic control and embedded systems for applications in the fields of electricity - electronics - microchips, chip - automation - industrial electricity.',
      descriptionACT:
        'The society is in the 4.0 period, with the development of information technology. There is no small importance in the industry of cryptography. Currently in Vet Nam there are many universities training cryptographic engineering, including the Institute of Cryptographic Engineering. But many people still do not know what the academy of cryptography does,find out. ',
      share: 'SHARE TO RECEIVE GIFTS',
      postContent: 'INSTITUTE OF CRYPTOGRAPHIC ENGINEERING ADMISSION',
      buttonShare: 'Share',
      chooseGift: 'Choose your gift',
      congratulation: 'CONGRATULATION !',
    },
  },
  vn: {
    translation: {
      welcome: 'Bạn sẽ đăng ký học tại Học viện Kỹ Thuật Mật Mã ?',
      inevitable: 'TẤT NHIÊN, KMA LÀ LỰA CHỌN CỦA MÌNH',
      mayBe: 'MÌNH ĐANG PHÂN VÂN',
      noChoose: 'MÌNH ĐÃ CÓ KẾ HOẠCH KHÁC',
      cntt: 'CÔNG NGHỆ THÔNG TIN',
      attt: 'AN TOÀN THÔNG TIN',
      continue: 'TIẾP TỤC',
      dtvt: 'KĨ THUẬT ĐIỆN TỬ VIỄN THÔNG',
      share: 'CHIA SẺ ĐỂ NHẬN PHẦN QUÀ',
      congratulation: 'CHÚC MỪNG BẠN !',
      settings: 'Cài đặt',
      home: 'Trang chủ',
      language: 'Ngôn ngữ',
      industry: 'Ngành bạn quan tâm ?',
      thanks: 'Cảm ơn bạn !',
      takeGift: 'Học viện tặng bạn món quà kỉ niệm',
      descriptionCntt:
        'Thiết kế, phát triển và lập trình phần mềm nhúng trên các thiết bị di động (smartphone, tablet, iphone, ipad ...); điều kiển vi xử lý, vi điều kiển, gia dụng; xây dựng giải pháp nhúng tự động hoá tác nghiệp.',
      descriptionAttt:
        'Thiết kế, phát triển, vận hành và đảm bảo an toàn cho các hệ thống mạng CNTT - Truyền thông - Viễn thông, các hệ thống cơ sở dữ liệu và hạ tầng mạng, xây dựng chính sách an toàn, kiểm định, đánh giá an toàn cho các hệ thống thông tin; điều tra số và khắc phục sự cố; phòng vệ và bảo vệ chủ quyền không gian số quốc gia.',
      descriptionDtvt:
        'Thiết kế, phát triển, lập trình, vận hành các hệ thống nhúng và điều khiển tự động ứng dụng trong các lĩnh vực điện - điện tử - vi mạch, chip - tự động hoá -điện công nghiệp.',
      descriptionACT:
        'Xã hội đang trong thời kỳ 4.0, công nghệ thông tin phát triển. Trong có có ngành mật mã có sự quan trọng không hề nhỏ. Hiện nay ở Vệt Nam đã và đang có nhiều trường đại học đào tạo ngành kỹ thuật mật mã, trong đó có Học Viện Kỹ thuật mật mã. Nhưng nhiều người vẫn không biết học viện kỹ thuật mật mã ra làm gì hãy tìm hiểu nào.',
      postContent: 'Học viện Kỹ thuật mật mã tuyển sinh',
      buttonShare: 'Chia sẻ',
      chooseGift: 'Chọn món quà của bạn', // edit
      login: 'Đăng nhập',
      signup: 'Đăng ký',
      addDevice: 'Thêm thiết bị',
      addFeature: 'Thêm tính năng',
      listDevices: 'Danh sách',
      logout: 'Đăng xuất',
      selectLang: 'Ngôn ngữ',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vn',
    fallbackLng: 'vn',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
