import * as S from '@/pages/SignUp/styles';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '@/types/signup';
import { SubmitForm } from '@/types/submitForm';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import { AxiosError } from 'axios';
import { ApiResponseType } from '@/types/apiResponseType';

const index = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_check: '',
    },
  });

  const { mutate: signUpAPI } = useMutation((form: SubmitForm) =>
    restFetcher({
      method: 'POST',
      path: '/users/signup',
      body: form,
    }),
  );
  const onSubmit = (data: SubmitForm) => {
    const form: SubmitForm = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    signUpAPI(form, {
      onSuccess: () => {
        alert('회원 가입에 성공하였습니다.');
        navigate('/login');
      },
      onError: (err) => {
        const error = err as AxiosError<ApiResponseType>;
        alert(error.response?.data.message);
      },
    });
  };
  return (
    <S.Container>
      <img
        id="main"
        src={logo}
        alt="홈페이지 메인으로 이동"
        loading="lazy"
        onClick={() => navigate('/')}
      ></img>
      <S.Forms>
        <S.NameInput
          id="name"
          type="text"
          placeholder="이름"
          {...register('name', {
            required: '이름은 필수 입력사항입니다.',
          })}
        />
        <S.EmailInput
          id="email"
          type="email"
          placeholder="이메일"
          {...register('email', {
            required: '이메일은 필수 입력사항입니다.',
            pattern: {
              value:
                /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              message: '@를 포함한 유효한 이메일로 작성해야합니다.',
            },
          })}
        />
        <S.PasswordInput
          id="password"
          type="password"
          placeholder="8~15자리 영문, 숫자 포함"
          {...register('password', {
            required: '비밀번호는 필수 입력사항입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
              message: '8~15자리 영문, 숫자를 포함하여야합니다.',
            },
          })}
        />
        <S.PasswordCorrectInput
          id="password_check"
          type="password"
          placeholder="8~15자리 영문, 숫자 포함"
          {...register('password_check', {
            required: '비밀번호를 확인해주세요',
            validate: (validate: string) => {
              if (watch('password') !== validate) {
                return '비밀번호가 일치하지 않습니다.';
              }
            },
          })}
        ></S.PasswordCorrectInput>
      </S.Forms>
      <S.Buttons>
        <S.SaveBtn type="submit" onClick={handleSubmit(onSubmit)}>
          저장하기
        </S.SaveBtn>
        <S.CancelBtn>취소하기</S.CancelBtn>
      </S.Buttons>
    </S.Container>
  );
};

export default index;
