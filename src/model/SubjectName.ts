/**
 * deal with the name of subjects.
 */
export class SubjectName {
  public static CHINESE_NO: number = 0;
  private static readonly CHINESE_EN: string = 'chinese';
  private static readonly CHINESE_ZH: string = '國文';

  public static ENGLISH_NO: number = 1;
  private static readonly ENGLISH_EN: string = 'english';
  private static readonly ENGLISH_ZH: string = '英文';

  public static MATH_NO: number = 2;
  private static readonly MATH_EN: string = 'math';
  private static readonly MATH_ZH: string = '數學';

  public static PHYSICS_NO: number = 3;
  private static readonly PHYSICS_EN: string = 'physics';
  private static readonly PHYSICS_ZH: string = '物理';

  public static CHEMISTRY_NO: number = 4;
  private static readonly CHEMISTRY_EN: string = 'chemistry';
  private static readonly CHEMISTRY_ZH: string = '化學';

  public static PHYSICS_AND_CHEMISTRY_NO: number = 5;
  private static readonly PHYSICS_AND_CHEMISTRY_EN: string =
    'physics&chemistry';
  private static readonly PHYSICS_AND_CHEMISTRY_ZH: string = '理化';

  public static readonly ENGLISH_NAME: string[] = [
    SubjectName.CHINESE_EN,
    SubjectName.ENGLISH_EN,
    SubjectName.MATH_EN,
    SubjectName.PHYSICS_EN,
    SubjectName.CHEMISTRY_EN,
    SubjectName.PHYSICS_AND_CHEMISTRY_EN,
  ];

  public static readonly CHINESE_NAME: string[] = [
    SubjectName.CHINESE_ZH,
    SubjectName.ENGLISH_ZH,
    SubjectName.MATH_ZH,
    SubjectName.PHYSICS_ZH,
    SubjectName.CHEMISTRY_ZH,
    SubjectName.PHYSICS_AND_CHEMISTRY_ZH,
  ];
}
