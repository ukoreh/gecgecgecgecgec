export type Left<T> = { tag: 'left', value: T };
export type Right<T> = { tag: 'right', value: T };

export type Either<L, R> = Left<L> | Right<R>;

export function left<T>(value: T) {
    return <Left<T>>{ tag: 'left', value: value };
}

export function right<T>(value: T) {
    return <Right<T>>{ tag: 'right', value: value };
}

export function isLeft<L, R>(value: Either<L, R>) {
    console.log(value)
    return value.tag === 'left';
}

export function unwrapLeft<L, R>(monad: Either<L, R>) {
    return monad.value as L;
}

export function unwrapRight<L, R>(monad: Either<L, R>) {
    return monad.value as R;
}
