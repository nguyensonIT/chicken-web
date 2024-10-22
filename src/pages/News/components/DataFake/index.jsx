import img1 from "../../../../assets/img/galuoc.jpg";
import img2 from "../../../../assets/img/garan.jpg";
import img3 from "../../../../assets/img/garansuat.jpg";
import img4 from "../../../../assets/img/imgChicken.jpg";

export const dataNews = [
  {
    userPost: {
      name: "Admin Vua Gà Tươi",
      image: "url_to_image",
      userId: "admin_vua_ga_tươi",
    },
    id: 123,
    data: {
      textContent: `CÁI LẠNH ĐẦU MÙA CŨNG KHÔNG THỂ GIẢM NHIỆT SỨC NÓNG CỦA DÀN LINE-UP CHÍNH THỨC TẠI NEU CONCERT 2024

Mùa thu năm nay đánh dấu sự trở lại của NEU Concert. Đặc biệt, vào năm 2024, sự kiện đã được "update" lên quy mô lớn hơn, trở thành chuỗi sự kiện khai giảng chính thức duy nhất của trường Đại học Kinh tế Quốc dân.

Với sự góp mặt của những cái tên đình đám trong làng nhạc như Big Daddy, Emily, Noo Phước Thịnh, Da Lab cùng bộ đôi 52Hz - Rio, đêm Đại nhạc hội hứa hẹn sẽ mang đến những trải nghiệm bùng nổ cảm xúc. Các sinh viên K66 sẽ được hòa mình vào không khí trẻ trung và đầy nhiệt huyết, cùng nhau tạo nên những kỷ niệm đẹp của thanh xuân.

Vậy nên, hãy cùng "save the date" và đón chờ những màn trình diễn đặc sắc chỉ có tại NEU CONCERT 2024 nhé!

--------------------

🎤 NEU CONCERT - Chuỗi sự kiện khai giảng thường niên duy nhất, tổ chức NỘI BỘ, KHÔNG BÁN VÉ và DÀNH RIÊNG CHO sinh viên trường ĐH Kinh tế Quốc dân.
📅 Thời gian: 05/10/2024
📍 Địa điểm: Sân KTX trường Đại học Kinh tế Quốc dân`,
      arrImg: [img1, img2, img3, img4, img3],
      qntLike: 10,
      qntComment: 10,
      timestamp: "2024-10-05T10:00:00Z",
      likedBy: ["user1", "user2"], // Danh sách ID người dùng đã like
      commentedBy: [
        {
          userId: "user1",
          name: "Admin Vua Gà Tươi",
          image: "url_to_image",
          commentData: {
            text: "Bài viết hay!",
            image: img1,
          },
          replies: [
            {
              userId: "user3",
              name: "Admin Vua Gà Tươi",
              image: "url_to_image",
              reply: {
                text: "Cảm ơn bạn!",
                image: img2,
              },
            },
            {
              userId: "user4",
              name: "Admin Vua Gà Tươi",
              image: "url_to_image",
              reply: {
                text: "Đồng ý với bạn!",
                image: "",
              },
            },
          ],
        },
      ], // Danh sách bình luận
    },
    order: 1,
  },
];

export const dataPost = [
  {
    _id: "67055921dec42cf4284f30e7",
    content: "Đây là một bài viết mẫu.",
    userId: {
      _id: "66c5dc715f6efa2450a99482",
      name: "Nguyễn Sơn",
      image: "",
    },
    images: ["http://placehold.co/600x400/png", "http://placehold.co/400"],
    comments: [
      {
        _id: "67056be99319d1e83a72d14c",
        postId: "67055921dec42cf4284f30e7",
        content: "Đây là một bình luận.",
        userId: "66c5dc715f6efa2450a99482",
        image: "https://placehold.co/600x400/png",
        replies: ["67056c219319d1e83a72d154"],
        createdAt: "2024-10-08T17:29:13.898Z",
      },
      {
        _id: "67056c219319d1e83a72d154",
        postId: "67055921dec42cf4284f30e7",
        content: "Trả lời bình luận của 1 bình luận",
        userId: "66c6c612f5147b3c382af7a4",
        image: "https://placehold.co/600x400/png",
        replies: [],
        createdAt: "2024-10-08T17:30:09.863Z",
      },
    ],
    order: 1,
    createdAt: "2024-10-08T16:09:05.064Z",
    likedBy: [
      {
        _id: "66c6c612f5147b3c382af7a4",
        name: "hihihi123456@gmail.com",
        image: "",
      },
      {
        _id: "66c5dc715f6efa2450a99482",
        name: "Nguyễn Sơn",
        image: "",
      },
    ],
  },
  {
    _id: "67056750b54c6bd87cfc8e11",
    content: "Đây là một bài viết mẫu. 2222222",
    userId: {
      _id: "66c5dc715f6efa2450a99482",
      name: "Nguyễn Sơn",
      image: "",
    },
    images: ["https://placehold.co/600x400/png", "https://placehold.co/400"],
    comments: [],
    order: 2,
    createdAt: "2024-10-08T17:09:36.670Z",
    likedBy: [
      {
        _id: "66c5dc715f6efa2450a99482",
        name: "Nguyễn Sơn",
        image: "",
      },
    ],
  },
];

export const dataComments = [
  {
    _id: "67056be99319d1e83a72d14c",
    postId: "67055921dec42cf4284f30e7",
    content: "Đây là một bình luận.",
    userId: {
      _id: "66c5dc715f6efa2450a99482",
      name: "Nguyễn Sơn",
      image: "",
    },
    image: "https://placehold.co/600x400/png",
    replies: [
      {
        _id: "67056c219319d1e83a72d154",
        postId: "67055921dec42cf4284f30e7",
        content: "Trả lời bình luận của 1 bình luận",
        userId: {
          _id: "66c6c612f5147b3c382af7a4",
          name: "hihihi123456@gmail.com",
          image: "",
        },
        image: "https://placehold.co/600x400/png",
        replies: [],
        parentId: "67056be99319d1e83a72d14c",
        createdAt: "2024-10-08T17:30:09.863Z",
      },
    ],
    parentId: null,
    createdAt: "2024-10-08T17:29:13.898Z",
  },
  {
    _id: "670682cea6f7e22aa43317dd",
    postId: "67055921dec42cf4284f30e7",
    content: "Đây là một bình luận. 2222",
    userId: {
      _id: "66c5dc715f6efa2450a99482",
      name: "Nguyễn Sơn",
      image: "",
    },
    image: "http://placehold.co/600x400/png",
    replies: [],
    parentId: null,
    createdAt: "2024-10-09T13:19:10.681Z",
  },
];
