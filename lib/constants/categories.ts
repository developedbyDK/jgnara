export interface SubCategory {
  label: string;
  href: string;
  slug: string;
}

export interface Category {
  label: string;
  href: string;
  slug: string;
  subcategories: SubCategory[];
  /** DB category 컬럼에 저장되는 값 (폼 CATEGORY_OPTIONS 기준) */
  categoryValues?: string[];
}

export const CATEGORIES: Category[] = [
  {
    label: "굴삭기/어태치부속",
    href: "/category/excavator",
    slug: "excavator",
    categoryValues: ["굴삭기"],
    subcategories: [
      {
        label: "굴삭기 1.3㎥이상",
        href: "/category/excavator/large",
        slug: "large",
      },
      {
        label: "굴삭기 1.0㎥이상",
        href: "/category/excavator/medium",
        slug: "medium",
      },
      { label: "미니굴삭기", href: "/category/excavator/mini", slug: "mini" },
      {
        label: "굴삭기타이어식",
        href: "/category/excavator/wheeled",
        slug: "wheeled",
      },
      {
        label: "어태치먼트",
        href: "/category/excavator/attachment",
        slug: "attachment",
      },
      { label: "굴삭기부속", href: "/category/excavator/parts", slug: "parts" },
    ],
  },
  {
    label: "덤프트럭/추레라",
    href: "/category/dump-truck",
    slug: "dump-truck",
    categoryValues: ["덤프트럭"],
    subcategories: [
      {
        label: "15톤 덤프트럭",
        href: "/category/dump-truck/15ton",
        slug: "15ton",
      },
      {
        label: "25톤 덤프트럭",
        href: "/category/dump-truck/25ton",
        slug: "25ton",
      },
      { label: "축덤프", href: "/category/dump-truck/axle", slug: "axle" },
      {
        label: "추레라",
        href: "/category/dump-truck/trailer",
        slug: "trailer",
      },
      { label: "덤프부속", href: "/category/dump-truck/parts", slug: "parts" },
    ],
  },
  {
    label: "믹서트럭/펌프카",
    href: "/category/mixer-truck",
    slug: "mixer-truck",
    categoryValues: ["콘크리트펌프"],
    subcategories: [
      { label: "믹서트럭", href: "/category/mixer-truck/mixer", slug: "mixer" },
      { label: "펌프카", href: "/category/mixer-truck/pump", slug: "pump" },
      {
        label: "믹서/펌프부속",
        href: "/category/mixer-truck/parts",
        slug: "parts",
      },
    ],
  },
  {
    label: "지게차/하이랜더",
    href: "/category/forklift",
    slug: "forklift",
    categoryValues: ["지게차"],
    subcategories: [
      {
        label: "지게차",
        href: "/category/forklift/forklift",
        slug: "forklift",
      },
      {
        label: "하이랜더",
        href: "/category/forklift/highlander",
        slug: "highlander",
      },
      {
        label: "스키드로더",
        href: "/category/forklift/skid-loader",
        slug: "skid-loader",
      },
      { label: "지게차부속", href: "/category/forklift/parts", slug: "parts" },
    ],
  },
  {
    label: "압롤/진게/물차",
    href: "/category/water-truck",
    slug: "water-truck",
    categoryValues: [],
    subcategories: [
      { label: "압롤", href: "/category/water-truck/roll", slug: "roll" },
      { label: "진게", href: "/category/water-truck/grapple", slug: "grapple" },
      {
        label: "물차/살수차",
        href: "/category/water-truck/water",
        slug: "water",
      },
      {
        label: "청소차",
        href: "/category/water-truck/sweeper",
        slug: "sweeper",
      },
    ],
  },
  {
    label: "카고/냉동/탑차",
    href: "/category/cargo-truck",
    slug: "cargo-truck",
    categoryValues: [],
    subcategories: [
      { label: "카고트럭", href: "/category/cargo-truck/cargo", slug: "cargo" },
      {
        label: "냉동탑차",
        href: "/category/cargo-truck/refrigerated",
        slug: "refrigerated",
      },
      {
        label: "윙바디",
        href: "/category/cargo-truck/wing-body",
        slug: "wing-body",
      },
      { label: "탑차", href: "/category/cargo-truck/box", slug: "box" },
    ],
  },
  {
    label: "크레인/카고크레인",
    href: "/category/crane",
    slug: "crane",
    categoryValues: ["크레인"],
    subcategories: [
      {
        label: "카고크레인",
        href: "/category/crane/cargo-crane",
        slug: "cargo-crane",
      },
      { label: "타워크레인", href: "/category/crane/tower", slug: "tower" },
      {
        label: "크롤러크레인",
        href: "/category/crane/crawler",
        slug: "crawler",
      },
      { label: "기중기", href: "/category/crane/hoist", slug: "hoist" },
      { label: "크레인부속", href: "/category/crane/parts", slug: "parts" },
    ],
  },
  {
    label: "로더/도저/그레이더",
    href: "/category/loader",
    slug: "loader",
    categoryValues: ["로더", "불도저", "그레이더"],
    subcategories: [
      { label: "로더", href: "/category/loader/loader", slug: "loader" },
      {
        label: "불도저",
        href: "/category/loader/bulldozer",
        slug: "bulldozer",
      },
      { label: "그레이더", href: "/category/loader/grader", slug: "grader" },
      { label: "로더부속", href: "/category/loader/parts", slug: "parts" },
    ],
  },
  {
    label: "피니셔/롤러",
    href: "/category/finisher",
    slug: "finisher",
    categoryValues: ["롤러"],
    subcategories: [
      {
        label: "아스팔트피니셔",
        href: "/category/finisher/asphalt",
        slug: "asphalt",
      },
      { label: "로울러", href: "/category/finisher/roller", slug: "roller" },
      {
        label: "다짐장비",
        href: "/category/finisher/compaction",
        slug: "compaction",
      },
    ],
  },
  {
    label: "크러셔/배치플랜트",
    href: "/category/crusher",
    slug: "crusher",
    categoryValues: ["스크레이퍼"],
    subcategories: [
      { label: "크러셔", href: "/category/crusher/crusher", slug: "crusher" },
      {
        label: "배치플랜트",
        href: "/category/crusher/batch-plant",
        slug: "batch-plant",
      },
      { label: "스크린", href: "/category/crusher/screen", slug: "screen" },
    ],
  },
  {
    label: "콤프/드릴/항타기",
    href: "/category/compressor",
    slug: "compressor",
    categoryValues: ["천공기", "항타기"],
    subcategories: [
      {
        label: "콤프레셔",
        href: "/category/compressor/compressor",
        slug: "compressor",
      },
      {
        label: "천공기/드릴",
        href: "/category/compressor/drill",
        slug: "drill",
      },
      {
        label: "항타/항발기",
        href: "/category/compressor/pile-driver",
        slug: "pile-driver",
      },
      {
        label: "브레이커",
        href: "/category/compressor/breaker",
        slug: "breaker",
      },
    ],
  },
  {
    label: "기타건설기계",
    href: "/category/etc",
    slug: "etc",
    categoryValues: ["기타"],
    subcategories: [
      { label: "발전기", href: "/category/etc/generator", slug: "generator" },
      { label: "용접기", href: "/category/etc/welder", slug: "welder" },
      { label: "고소작업차", href: "/category/etc/aerial", slug: "aerial" },
      { label: "기타장비", href: "/category/etc/others", slug: "others" },
    ],
  },
];

export const FREIGHT_CATEGORIES: Category[] = [
  {
    label: "카고/개인/철근/가축운반차",
    href: "/category/cargo-transport",
    slug: "cargo-transport",
    subcategories: [],
  },
  {
    label: "중기덤프/곡물/카고진게",
    href: "/category/freight-dump",
    slug: "freight-dump",
    subcategories: [],
  },
  {
    label: "냉동/윙카/각종탑차",
    href: "/category/refrigerated-wing",
    slug: "refrigerated-wing",
    subcategories: [],
  },
  {
    label: "츄레라/셀프/풀카/트레일러",
    href: "/category/freight-trailer",
    slug: "freight-trailer",
    subcategories: [],
  },
  {
    label: "렉카/셀프/어브바/카캐리어",
    href: "/category/wrecker",
    slug: "wrecker",
    subcategories: [],
  },
  {
    label: "오가/집게/바가지/사다리차",
    href: "/category/ladder-truck",
    slug: "ladder-truck",
    subcategories: [],
  },
  {
    label: "탱크로리",
    href: "/category/tanker",
    slug: "tanker",
    subcategories: [],
  },
  {
    label: "고속/관광/시내/미니버스",
    href: "/category/bus",
    slug: "bus",
    subcategories: [],
  },
  {
    label: "캠핑/구급/제설/광고/특수차",
    href: "/category/special-vehicle",
    slug: "special-vehicle",
    subcategories: [],
  },
];

export const ALL_CATEGORIES: Category[] = [
  ...CATEGORIES,
  ...FREIGHT_CATEGORIES,
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

/** slug에 매핑되는 DB category 값 배열 반환 */
export function getCategoryValuesBySlug(slug: string): string[] {
  const cat = getCategoryBySlug(slug);
  return cat?.categoryValues ?? [];
}
